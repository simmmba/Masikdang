from rest_framework.decorators import api_view
from rest_framework.response import Response
from .parse import load_dataframes
import pandas as pd
import shutil

from sklearn.decomposition import TruncatedSVD
from scipy.sparse.linalg import svds

import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import warnings

def data_store(dataframes, n=20, min_reviews=30):
    # 원본 데이터
    origin_store = dataframes["stores"]
    origin_review = dataframes["reviews"]

    # 필요한 칼럼만 추출 작업
    stores = pd.merge(
        origin_store, origin_review, left_on="store_id", right_on="store_id"
    )
    stores = stores[stores['review_cnt'] >= 5]
    stores.drop('review_id', axis = 1, inplace = True)
    stores.drop('review_cnt', axis = 1, inplace = True)
    stores.drop('user_id', axis = 1, inplace = True)
    stores.drop('score', axis = 1, inplace = True)
    print(stores.shape)
    print("stores 까지는 됨" )
    print(stores.head())
   
    reviews = origin_review[origin_review['score']>=1]
    # reviews = reviews.groupby('user_id')['score'].count().reset_index().sort_values('score', ascending = False)
    filter_reviews = origin_review['user_id'].value_counts() >= 300
    filter_reviews = filter_reviews[filter_reviews].index.tolist()

    new_reviews = reviews[reviews['user_id'].isin(filter_reviews)]
    print(new_reviews.shape)
    print("reviews 까지는 됨" )
    print(new_reviews.head())
    
    stores_reviews = pd.merge(stores, new_reviews, on = 'store_id')
    # print(stores_reviews.shape)
    print("stores_reviews 까지는 됨" )
    # print(stores_reviews.head())
    
    stores_reviews.drop('review_id', axis = 1, inplace = True)
    print(stores_reviews.shape)
    print("stores_reviews 전처리 까지는 됨" )
    print(stores_reviews.head())
    
    user_sotre_score = stores_reviews.pivot_table(
        'score', 'user_id', 'store_id', fill_value="0"
    )
    # print(user_sotre_score.shape)
    print("user_sotre_score 까지는 됨" )
    print(user_sotre_score.head())
    
    # matrix는 pivot_table 값을 numpy matrix로 만든 것 
    matrix = user_sotre_score.values
    matrix = matrix.astype(np.float64)
    print(matrix)
    # user_score_mean은 사용자의 평균 평점 
    user_score_mean = np.mean(matrix, axis = 1)
    print(user_score_mean)

    # matrix_user_mean : 사용자-음식점에 대해 사용자 평균 평점을 뺀 것.
    matrix_user_mean = matrix - user_score_mean.reshape(-1, 1)
    pd.DataFrame(matrix_user_mean, columns = user_sotre_score.columns).head()
    U, sigma, Vt = svds(matrix_user_mean, k=5)
    sigma = np.diag(sigma)

    svd_user_predicted_score =np.dot(np.dot(U, sigma), Vt) + user_score_mean.reshape(-1,1)
    df_svd_preds = pd.DataFrame(svd_user_predicted_score, columns =user_sotre_score.columns )
    print("svd 행렬 완성")
    print(df_svd_preds)

    user_id = 5
    user_row_number = user_id - 1
    # 최종적으로 만든 pred_df에서 사용자 index에 따라 영화 데이터 정렬 -> 음식 평점이 높은 순으로 정렬 됌
    print("추천 시작")
    print(df_svd_preds.iloc[0])
    sorted_user_predictions = df_svd_preds.iloc[user_row_number].sort_values(ascending=False)
    
    # 원본 평점 데이터에서 user id에 해당하는 데이터를 뽑아낸다.
    print(origin_review)
    user_data = origin_review[origin_review.user_id == 68632]
    
    # 위에서 뽑은 user_data와 원본 영화 데이터를 합친다.
    origin_store = dataframes["stores"]
    user_history = user_data.merge(origin_store, on = 'store_id').sort_values(['score'], ascending=False)
    
    # 원본 영화 데이터에서 사용자가 본 영화 데이터를 제외한 데이터를 추출
    recommendations = origin_store[~origin_store['store_id'].isin(user_history['store_id'])]
    # 사용자의 영화 평점이 높은 순으로 정렬된 데이터와 위 recommendations을 합친다.
    recommendations = recommendations.merge(pd.DataFrame(sorted_user_predictions).reset_index(), on = 'store_id')
    # 컬럼 이름 바꾸고 정렬해서 return
    recommendations = recommendations.rename(columns = {user_row_number: 'Predictions'}).sort_values('Predictions', ascending = False).iloc[:10, :]
                      
    print(recommendations)

    return recommendations


@api_view(['GET', 'POST'])
def filtering(request):
    if request.method == 'GET':
        print("get 요청 받음")
        data = load_dataframes()
        print("데이터 전 처리/ 분석 시작")
        df_svd_preds = data_store(data)
        print("데이터 분석 완료")
        print(df_svd_preds)
    return Response(df_svd_preds)
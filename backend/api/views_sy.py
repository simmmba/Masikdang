from rest_framework.decorators import api_view
from rest_framework.response import Response
from .parse import load_dataframes
import pandas as pd
import shutil

from sklearn.decomposition import TruncatedSVD
from scipy.sparse.linalg import svds

import numpy as np
import warnings


def data_store(dataframes, n=20, min_reviews=30):
    # 원본 데이터
    origin_store = dataframes["stores"]
    origin_store = origin_store[origin_store['review_cnt'] >= 5]
    origin_review = dataframes["reviews"]
    print("원본 데이터")
    print(origin_store.head())
    print(origin_review.head())

    # stores = pd.merge(
    #     origin_store, origin_review, left_on="store_id", right_on="store_id"
    # )
    # print(stores.head())

    # #필요 없는 칼럼 없애기
    # stores.drop('review_id', axis = 1, inplace = True)
    origin_store.drop('review_cnt', axis=1, inplace=True)
    # stores.drop('user_id', axis = 1, inplace = True)
    # stores.drop('score', axis = 1, inplace = True)
    # print("가공된 음식점 데이터" )
    # print(stores.head())

    # 평점이 0점 이거나 없는 데이터 없애기
    reviews = origin_review[origin_review['score'] >= 1]
    # 300명 이상에게 평점 매겨진 데이터만 가져오기
    filter_reviews = origin_review['user_id'].value_counts() >= 300
    filter_reviews = filter_reviews[filter_reviews].index.tolist()
    new_reviews = reviews[reviews['user_id'].isin(filter_reviews)]
    print("가공 된 리뷰 데이터")
    print(new_reviews.head())

    # 스토어와 리뷰를 가지고 새로운 데이터 프레임 생성
    stores_reviews = pd.merge(origin_store, new_reviews, on='store_id')
    # 리뷰 아이디는 필요 없으니 버리기
    stores_reviews.drop('review_id', axis=1, inplace=True)
    print("스토어 리뷰 하나의 데이터로 생성 stores_reviews")
    print(stores_reviews.head())

    # 피봇 테이블 생성 (values, index, column) 순서
    user_sotre_score = stores_reviews.pivot_table(
        'score', 'user_id', 'store_id', fill_value="0"
    )
    # print(user_sotre_score.shape)
    print("피봇 테이블 user_store_score")
    print(user_sotre_score)

    # matrix는 pivot_table 값을 numpy matrix로 만든 것
    matrix = user_sotre_score.values
    # 타입을 부동 소수점으로 지정
    matrix = matrix.astype(np.float64)
    # user_score_mean은 사용자의 평균 평점
    user_score_mean = np.mean(matrix, axis=1)
    print("사용자의 평균 평점")
    print(user_score_mean)

    # matrix_user_mean : 사용자-음식점에 대해 사용자 평균 평점을 뺀 것.
    matrix_user_mean = matrix - user_score_mean.reshape(-1, 1)
    pd.DataFrame(matrix_user_mean, columns=user_sotre_score.columns).head()
    U, sigma, Vt = svds(matrix_user_mean, k=5)
    sigma = np.diag(sigma)

    svd_user_predicted_score = np.dot(
        np.dot(U, sigma), Vt) + user_score_mean.reshape(-1, 1)
    df_svd_preds = pd.DataFrame(
        svd_user_predicted_score, columns=user_sotre_score.columns)
    print("svd 행렬 완성")
    print(df_svd_preds)

    user_id = 74999
    user_row_number = 4 
    # 최종적으로 만든 pred_df에서 사용자 index에 따라 상점 데이터 정렬 -> 음식 평점이 높은 순으로 정렬 됌
    print("추천 시작")
    print(df_svd_preds.iloc[0])
    sorted_user_predictions = df_svd_preds.iloc[4].sort_values(ascending=False)

    # 원본 평점 데이터에서 user id에 해당하는 데이터를 뽑아낸다.
    user_data = origin_review[origin_review.user_id == user_id]

    # 위에서 뽑은 user_data와 원본 상점 데이터를 합친다.
    user_history = user_data.merge(origin_store, on='store_id').sort_values(['score'], ascending=False)

    # 원본 상점 데이터에서 사용자가 본 상점 데이터를 제외한 데이터를 추출
    recommendations = origin_store[~origin_store['store_id'].isin(user_history['store_id'])]
    # 사용자의 상점 평점이 높은 순으로 정렬된 데이터와 위 recommendations을 합친다.
    recommendations = recommendations.merge(pd.DataFrame(sorted_user_predictions).reset_index(), on='store_id')
    # 컬럼 이름 바꾸고 정렬해서 return
    recommendations = recommendations.rename(columns={user_row_number: 'Predictions'}).sort_values('Predictions', ascending=False).iloc[:10, :]

    print(recommendations)

    return recommendations

@api_view(['GET', 'POST'])
def filteringByUser(request):
    if request.method == 'GET':
        print("filteringBy User get 요청 받음")
        typeRes = request.query_params.get("type", "")
        user = request.query_params.get("user","")
        print(typeRes)
        print(user)
        data = load_dataframes()
        print("데이터 전 처리/ 분석 시작")
        df_svd_preds = data_store(data)
        print("데이터 분석 완료")
        print(df_svd_preds)

    return Response(df_svd_preds)

@api_view(['GET', 'POST'])
def filteringByType(request):
    if request.method == 'GET':
        print("filteringByType get 요청 받음")
        typeRes = request.query_params.get("type", "")
        print(typeRes)
        data = load_dataframes()
        print("데이터 전 처리/ 분석 시작")
        df_svd_preds = data_store(data)
        print("데이터 분석 완료")
        print(df_svd_preds)

    return Response(df_svd_preds)

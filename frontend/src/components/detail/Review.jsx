import React from "react";
import "./Review.scss";
import ReadScore from "../detail/ReadScore";

class Review extends React.Component {
  componentDidUpdate() {}

  // 최대 10개까지만 이미지 보이게 하기
  render() {
    return (
      <div className="Review">
        <div className="user_info">
          <img
            className="profile"
            alt="profile"
            src="https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png"
          ></img>
          <span className="user_name">다니다니는너무착하고</span>
          <ReadScore></ReadScore>
        </div>
        <div className="score_bundle">
          맛&nbsp;<span>★</span>&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;가격&nbsp;
          <span>★</span>&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;서비스&nbsp;
          <span>★</span>&nbsp;4
        </div>
        <div className="content">
          발렛추차를 해주셔서 좋았습니다.{"\n"}
          앉아마자 빠르게 반찬이 깔리고 메뉴판은{"\n"}
          주문지로 대체. 떡갈비 나오기전에 국이 나오는데 갈비탕 수준이었어요.
          {"\n"}더 줄까요. 하는말에 한그릇 갔다주십니다. 맛있게 먹었습니다.
          {"\n"}
          떡갈비는 1인분에 두장씩 인데 간이 새거나 달지 않아서 맛있습니다.{"\n"}
        </div>
        {/* 리뷰 이미지 들어가는 부분 1:1 */}
        <div className="review_img_bundle">
          <div className="review_img">
            <div className="thumbnail">
              <div className="centered">
                <img
                  className="store_img"
                  alt="store_img"
                  src="https://d2t7cq5f1ua57i.cloudfront.net/images/r_images/58254/51689/58254_51689_89_0_7327_201863161215969.jpg"
                  onClick={() => {
                    window.open("https://d2t7cq5f1ua57i.cloudfront.net/images/r_images/58254/51689/58254_51689_89_0_7327_201863161215969.jpg");
                  }}
                ></img>
              </div>
            </div>
          </div>
          <div className="review_img">
            <div className="thumbnail">
              <div className="centered">
                <img
                  className="store_img"
                  alt="store_img"
                  src="https://d2t7cq5f1ua57i.cloudfront.net/images/r_images/58254/51689/58254_51689_89_0_7327_201863161215969.jpg"
                  onClick={() => {
                    window.open("https://d2t7cq5f1ua57i.cloudfront.net/images/r_images/58254/51689/58254_51689_89_0_7327_201863161215969.jpg");
                  }}
                ></img>
              </div>
            </div>
          </div>
          <div className="review_img">
            <div className="thumbnail">
              <div className="centered">
                <img
                  className="store_img"
                  alt="store_img"
                  src="https://d2t7cq5f1ua57i.cloudfront.net/images/r_images/58254/51689/58254_51689_89_0_7327_201863161215969.jpg"
                  onClick={() => {
                    window.open("https://d2t7cq5f1ua57i.cloudfront.net/images/r_images/58254/51689/58254_51689_89_0_7327_201863161215969.jpg");
                  }}
                ></img>
              </div>
            </div>
          </div>
          <div className="review_img">
            <div className="thumbnail">
              <div className="centered">
                <img
                  className="store_img"
                  alt="store_img"
                  src="https://d2t7cq5f1ua57i.cloudfront.net/images/r_images/58254/51689/58254_51689_89_0_7327_201863161215969.jpg"
                  onClick={() => {
                    window.open("https://d2t7cq5f1ua57i.cloudfront.net/images/r_images/58254/51689/58254_51689_89_0_7327_201863161215969.jpg");
                  }}
                ></img>
              </div>
            </div>
          </div>
        </div>
        <div className="date"> 2019년 2월 22일 작성</div>
        <div className="edit_button">삭제&nbsp;</div>
        <div className="edit_button">수정</div>
      </div>
    );
  }
}

export default Review;

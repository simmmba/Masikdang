import React, { useEffect } from "react";
import axios from "axios";
import { useUser } from "../../contexts/user";
import "../routers/Mypage.scss";

const MyFavorite = ({ favorite, favoriteCnt }) => {
  const Emoji = (props) => (
    <span className="emoji" role="img" aria-label={props.label ? props.label : ""} aria-hidden={props.label ? "false" : "true"}>
      {props.symbol}
    </span>
  );

  useEffect(() => {
    let user = JSON.parse(window.sessionStorage.getItem("user"));
    //   console.log(user);

    axios({
      method: "get",
      url: "http://i02a201.p.ssafy.io:8080/api/review/user/" + user.id,
    })
      .then((res) => {
        // console.log(res.data);
        // reviewCnt(res.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="favoriteBox">
      <div className="favoriteTitle">
        <Emoji label="like" symbol="❤️" /> 최근 좋아한 식당
      </div>
      {favorite > 0 ? (
        <>
          <div className="title">작성한 리뷰</div>
        </>
      ) : (
        <>
          <div className="empty">좋아하는 식당이 없습니다</div>
        </>
      )}
    </div>
  );
};

export default useUser(({ state, actions }) => ({
  favorite: state.favorite,
  favoriteCnt: actions.favoriteCnt,
}))(MyFavorite);

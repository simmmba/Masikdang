import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useUser } from "../../contexts/user";
import "../routers/Mypage.scss";

const MyFavorite = ({ favorite, favoriteCnt }) => {
  const Emoji = (props) => (
    <span className="emoji" role="img" aria-label={props.label ? props.label : ""} aria-hidden={props.label ? "false" : "true"}>
      {props.symbol}
    </span>
  );

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    let user = JSON.parse(window.sessionStorage.getItem("user"));
    // console.log(user.id);

    axios({
      method: "get",
      url: "http://i02a201.p.ssafy.io:8080/api/user/like_list/" + user.id,
    })
      .then((res) => {
        console.log(res.data);
        favoriteCnt(res.data.length);
        res.data.length > 5 ? setFavorites(res.data.slice(0, 5)) : setFavorites(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [favoriteCnt]);

  return (
    <div className="favoriteBox">
      <div className="favoriteTitle">
        <Emoji label="like" symbol="❤️" /> 최근 즐겨찾기 추가 식당
      </div>
      {favorite > 0 ? (
        <div className="contentBox">
          {favorites.map((f) => (
            <div className="fcontent" key={f.id}>
              <NavLink to={`/search/` + f.id} className="fname">
                {f.store_name}
              </NavLink>
              <div className="fcategory">{f.categoty !== null && f.category.split("|")[0]}</div>
              <div className="farea">{f.area}</div>
            </div>
          ))}
          {favorite > 5 && (
            <NavLink to={`/mypage/favorite`} className="moreBox">
              <div className="fmore">더보기</div>
            </NavLink>
          )}
        </div>
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

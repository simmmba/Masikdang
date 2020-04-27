import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useWhatToEat } from "../../contexts/whatToEat";
import "./WhatToEat.scss";

const WhatToEatResult = ({ wreset, wanswer }) => {
  const Emoji = (props) => (
    <span className="emoji" role="img" aria-label={props.label ? props.label : ""} aria-hidden={props.label ? "false" : "true"}>
      {props.symbol}
    </span>
  );

  const [login, setLogin] = useState(false);

  useEffect(() => {
    console.log(wanswer);

    // axios({
    //   method: "get",
    //   url: `${process.env.REACT_APP_URL}/survey/search`,
    //   params: {
    //     wanswer: wanswer,
    //   },
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    if (window.sessionStorage.getItem("user")) {
      setLogin(true);
    }
  }, [wanswer]);

  return (
    <div className="WhatToEatResultComponent">
      <div className="top">오늘 뭐먹지? 선택 결과</div>
      <div className="mentionBox">
        <div className="mentionTop">오늘의 추천 메뉴는 </div>
        <div className="select">
          <NavLink className="menu" to={`/`}>
            하나
          </NavLink>
          <NavLink className="menu" to={`/`}>
            하나
          </NavLink>
          <NavLink className="menu" to={`/`}>
            하나
          </NavLink>
          <NavLink className="menu" to={`/`}>
            하나
          </NavLink>
          <NavLink className="menu" to={`/`}>
            하나
          </NavLink>
        </div>
        <div className="mentionBottom">입니다.</div>
      </div>

      <div className="mentionBox">
        <div className="mention">
          <Emoji label="yum" symbol="🤤" />
          <u>먹고 싶은 메뉴</u>를 선택하면
        </div>
        <div className="mention">
          맛있는 <Emoji label="yum" symbol="🍝" />
          <u>마식당</u>을 추천해드려요!
        </div>
      </div>

      <NavLink className="retryBtn" to={`/whatToEat`} onClick={wreset}>
        다시 검색하기
      </NavLink>
      {/* 로그인 하지 않았으면 */}
      {!login && (
        <div className="memberBox">
          <NavLink className="memberBtn" to="/signup">
            회원가입
          </NavLink>
          <NavLink className="memberBtn" to="/login">
            로그인
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default useWhatToEat(({ state, actions }) => ({
  wanswer: state.wanswer,
  wreset: actions.wreset,
}))(WhatToEatResult);

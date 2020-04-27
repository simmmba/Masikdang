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

    // const bodyFormData = new FormData();

    // wanswer.forEach((item) => {
    //   bodyFormData.append("wanswer[]", item);
    // });

    // axios.post("https://test.com/api/get_product", bodyFormData);

    let payload = {
      wanswer: wanswer,
    };

    axios({
      method: "post",
      url: "http://i02a201.p.ssafy.io:8080/api/survey/search",
      data: payload,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    if (window.sessionStorage.getItem("user")) {
      setLogin(true);
    }
  }, [wanswer]);

  return (
    <div className="WhatToEatBox">
      <div className="ResultComponent">
        <div className="top">결과 페이지</div>
        {/* {console.log(wanswer)} */}
        <div className="select">
          {wanswer.map((option) => (
            <div key={option}>{option}</div>
          ))}
        </div>
        <div className="mention">를 선택하셨습니다.</div> <br />
        <NavLink className="retryBtn" to={`/whatToEat`} onClick={wreset}>
          다시 해보기
        </NavLink>
        {!login && (
          <NavLink className="pageBtn" to={`/`}>
            <Emoji label="home" symbol="🏠" />
            메인 페이지
          </NavLink>
        )}
        <NavLink className="pageBtn" to={`/home`}>
          <Emoji label="restaurant" symbol="🍝" /> 마식당 페이지
        </NavLink>
        {!login && (
          <div className="memberBox">
            <NavLink className="memberBtn" to="/login">
              로그인
            </NavLink>
            <NavLink className="memberBtn" to="/signup">
              회원가입
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default useWhatToEat(({ state, actions }) => ({
  wanswer: state.wanswer,
  wreset: actions.wreset,
}))(WhatToEatResult);

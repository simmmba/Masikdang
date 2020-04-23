import React from "react";
import { NavLink } from "react-router-dom";
import { useSurvey } from "../../contexts/survey";

const SurveyResult = ({ reset, answer }) => {
  return (
    <div className="WhatToEatBox">
      <div className="ResultComponent">
        <div className="top">결과 페이지</div>
        {console.log(answer)}
        <div className="select">
          <div>{answer}</div>
        </div>
        <div className="mention">를 선택하셨습니다.</div> <br />
        <NavLink className="retryBtn" to={`/survey`} onClick={reset}>
          다시 해보기
        </NavLink>
        <NavLink className="pageBtn" to={`/`}>
          🏠 메인 페이지
        </NavLink>
        <NavLink className="pageBtn" to={`/home`}>
          🍝 마식당 페이지
        </NavLink>
        <div className="memberBox">
          <NavLink className="memberBtn" to="/login">
            로그인
          </NavLink>
          <NavLink className="memberBtn" to="/signup">
            회원가입
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default useSurvey(({ state, actions }) => ({
  answer: state.answer,
  reset: actions.reset,
}))(SurveyResult);

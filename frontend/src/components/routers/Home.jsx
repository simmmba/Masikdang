import React from "react";
import { NavLink } from "react-router-dom";
import { useSurvey } from "../../contexts/survey";
import "./Main.scss";

const Main = ({ reset }) => {
  return (
    <div className="Main">
      <NavLink to="/login" onClick={reset}>
        로그인
      </NavLink>
      <NavLink to="/signup">회원가입</NavLink>
      <br />
      <NavLink to="/survey">마식는 테스트 하러가기</NavLink>
    </div>
  );
};

export default useSurvey(({ actions }) => ({
  reset: actions.reset,
}))(Main);

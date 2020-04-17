import React from "react";
import { NavLink } from "react-router-dom";
import { useSurvey } from "../../contexts/survey";
import "./Main.scss";

const Main = ({ reset }) => {
  return (
    <div className="Main">
      <NavLink to={`/survey`} className="box" onClick={reset}>
        마식는 테스트
      </NavLink>
      <NavLink to={`/home`} className="box">
        마식당 페이지
      </NavLink>
      <NavLink to={`/whatToEat`} className="box">
        오늘 뭐 먹지?
      </NavLink>
    </div>
  );
};

export default useSurvey(({ actions }) => ({
  reset: actions.reset,
}))(Main);

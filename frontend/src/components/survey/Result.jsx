import React from "react";
import { useSurvey } from "../../contexts/survey";
import { NavLink } from "react-router-dom";

const Result = ({ answer }) => {
  return (
    <div>
      <center>
        결과 페이지
        {console.log(answer)}
        <div>{answer}</div>
        <NavLink to={`/`}>메인으로 이동</NavLink>
        <NavLink to="/login">로그인</NavLink>
        <NavLink to="/signup">회원가입</NavLink>
      </center>
    </div>
  );
};

export default useSurvey(({ state }) => ({
  answer: state.answer,
}))(Result);

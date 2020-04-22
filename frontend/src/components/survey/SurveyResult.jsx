import React, { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useSurvey } from "../../contexts/survey";

const SurveyResult = ({ reset, answer, survey_result, surveyResult }) => {
  const Emoji = (props) => (
    <span className="emoji" role="img" aria-label={props.label ? props.label : ""} aria-hidden={props.label ? "false" : "true"}>
      {props.symbol}
    </span>
  );

  let data = answer.join("");

  useEffect(() => {
    axios({
      method: "get",
      url: "http://15.165.19.70:8080/api/survey/type",
      params: {
        data: data,
      },
    })
      .then((res) => {
        surveyResult(res.data);
        // console.log(survey_result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data, surveyResult]);

  return (
    <div className="WhatToEatBox">
      <div className="ResultComponent">
        <div className="top">결과 페이지</div>
        {console.log(survey_result)}
        <div className="mention">당신의 마식는 타입은 </div>
        <br />
        <div className="select">
          <div>{survey_result}</div>
        </div>
        <div className="mention">입니다.</div> <br />
        <NavLink className="retryBtn" to={`/survey`} onClick={reset}>
          다시 해보기
        </NavLink>
        <NavLink className="pageBtn" to={`/`}>
          <Emoji label="home" symbol="🏠" />
          메인 페이지
        </NavLink>
        <NavLink className="pageBtn" to={`/home`}>
          <Emoji label="restaurant" symbol="🍝" />
          마식당 페이지
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
  survey_result: state.survey_result,
  reset: actions.reset,
  surveyResult: actions.surveyResult,
}))(SurveyResult);

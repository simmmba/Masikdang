import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useSurvey } from "../../contexts/survey";
import "./Survey.scss";

const SurveyResult = ({ reset, answer, surveyResult, meaning }) => {
  const Emoji = (props) => (
    <span className="emoji" role="img" aria-label={props.label ? props.label : ""} aria-hidden={props.label ? "false" : "true"}>
      {props.symbol}
    </span>
  );

  let data = answer.join("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://15.165.19.70:8080/api/survey/type",
      params: {
        data: data,
      },
    })
      .then((res) => {
        let resultString = res.data.join(" ");
        surveyResult(resultString);
        setResult(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data, surveyResult]);

  return (
    <div className="SurveyResultComponent">
      <div className="top">마식는 테스트 결과!</div>
      <div className="mentionTop">당신의 마식는 타입은 </div>
      <div className="select">
        <div>{result[0]}</div>
        <div>
          {result[1]} {result[2]}
        </div>
      </div>
      <div className="mentionBottom">입니다!</div> <br />
      <div className="explain">
        <div className="exBox">
          <div>{meaning[1][answer[1]]}을 좋아하는 당신은</div>
          <div>
            {meaning[0][answer[0]]} {meaning[2][answer[2]]}에 {meaning[4][answer[4]]} 음식 먹기를 좋아하고,
          </div>
          <div>{meaning[5][answer[5]]}는군요!</div>
        </div>
        <div className="exBox">
          <div>{meaning[6][answer[6]]}며,</div>
          <div>{meaning[8][answer[8]]} 당신은</div>
          <div>{meaning[7][answer[7]]}을 중시하는</div>
          <div>
            {meaning[3][answer[3]]}가 중요한, <u>마식당이 필요한 사람입니다.</u>
          </div>
        </div>
      </div>
      <NavLink className="retryBtn" to={`/start`} onClick={reset}>
        다시 해보기
      </NavLink>
      <div className="memberBox">
        <NavLink className="pageBtn" to={`/`}>
          <Emoji label="home" symbol="🏠" />
          메인 페이지
        </NavLink>
        <NavLink className="pageBtn" to={`/home`}>
          <Emoji label="restaurant" symbol="🍝" />
          마식당 페이지
        </NavLink>
      </div>
      <div className="memberBox">
        <NavLink className="memberBtn" to="/login">
          로그인
        </NavLink>
        <NavLink className="memberBtn" to="/signup">
          회원가입
        </NavLink>
      </div>
    </div>
  );
};

export default useSurvey(({ state, actions }) => ({
  answer: state.answer,
  survey_result: state.survey_result,
  meaning: state.meaning,
  reset: actions.reset,
  surveyResult: actions.surveyResult,
}))(SurveyResult);

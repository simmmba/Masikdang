import React from "react";
import { useHistory } from "react-router-dom";
import { useSurvey } from "../../contexts/survey";
import "./WhatToEat.scss";
import { useWhatToEat } from "../../contexts/whatToEat";

const Counter = ({ windex, wreset }) => {
  let history = useHistory();

  const confirm = (val) => {
    if (window.confirm("테스트를 종료하시겠습니까?")) {
      wreset();
      val === "main" ? history.push("/") : history.push("/home");
    }
  };

  return (
    <div className="top">
      {/* <button className="btn" onClick={() => history.goBack()}> */}
      <button
        className="back"
        onClick={function () {
          confirm("main");
        }}
      >
        🏠메인
      </button>
      {/* </button> */}
      <span>
        <b>{windex + 1}번 질문!</b>
      </span>
      <button
        className="back"
        onClick={function () {
          confirm("home");
        }}
      >
        🍝마식당
      </button>
    </div>
  );
};

// 어떤 값을 props에 넣어줄 지 정해주기
export default useWhatToEat(({ state, actions }) => ({
  windex: state.windex,
  wquestion: state.wquestion,
  wreset: actions.wreset,
}))(Counter);

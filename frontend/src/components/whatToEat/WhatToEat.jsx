import React, { useState } from "react";
import { useWhatToEat } from "../../contexts/whatToEat";
import { NavLink } from "react-router-dom";
import Location from "./Location";
import "./WhatToEat.scss";

const WhatToEat = ({ wreset, windex, wquestion, woptions, wanswer, wincrement, wadd, wedit }) => {
  const [loc, setLoc] = useState("");

  const onChangeLoc = (e) => {
    setLoc(e.target.value);
  };

  const answering = (option) => {
    wanswer.length === windex ? wadd(option) : wedit(option); // 첫 응답 : 응답 수정
    // console.log(wanswer);
    wincrement();
  };

  const answeringLoc = () => {
    var pattern = /([^가-힣\x20])/i; // 한글 판단

    if (loc.search(/\s/) !== -1 || loc === "" || pattern.test(loc)) {
      alert("입력한 위치를 다시 확인해주세요.");
      document.getElementById("loc").value = "";
    } else {
      wanswer.length === windex ? wadd(loc) : wedit(loc); // 첫 응답 : 응답 수정
      // console.log(wanswer);
      // console.log(loc);
      wincrement();
    }
  };

  const done = (option) => {
    wadd(option);
    // console.log(wanswer);
  };

  const optionList = woptions[windex].map((option, idx) => (
    <div key={idx} className="option">
      {wanswer.length === wquestion.length ? wreset() : ""}
      {
        // 보통 설문
        windex !== wquestion.length - 1 && option !== "" ? (
          <NavLink
            to={`/whatToEat`}
            onClick={function () {
              // 응답 진행중
              answering(option);
            }}
            className="optionLink"
          >
            {option}
          </NavLink>
        ) : // 현위치 받는 설문
        windex !== wquestion.length - 1 && option === "" ? (
          // 현위치
          idx === 0 ? (
            <Location />
          ) : (
            // 직접 입력
            <div>
              <input className="locInput" id="loc" placeholder="위치를 입력하세요." val={loc} onChange={onChangeLoc} size="5" />
              &nbsp;
              <button
                className="locBtn"
                onClick={function () {
                  // 응답 진행중
                  answeringLoc();
                }}
              >
                입력
              </button>
            </div>
          )
        ) : (
          // 마지막 설문
          <NavLink
            to={`/whatToEatResult`}
            onClick={function () {
              // 마지막 문항 완료
              done(option);
            }}
            className="optionLink"
          >
            {" "}
            {option}{" "}
          </NavLink>
        )
      }
    </div>
  ));

  return (
    <div className="content">
      <h3 className="question">{wquestion[windex]}</h3>
      <div className="answer">{optionList}</div>
    </div>
  );
};

export default useWhatToEat(({ state, actions }) => ({
  wreset: actions.wreset,
  windex: state.windex,
  wquestion: state.wquestion,
  woptions: state.woptions,
  wanswer: state.wanswer,
  wadd: actions.wadd,
  wedit: actions.wedit,
  wincrement: actions.wincrement,
}))(WhatToEat);

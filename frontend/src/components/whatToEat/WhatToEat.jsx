import React from "react";
import { useWhatToEat } from "../../contexts/whatToEat";
import { NavLink } from "react-router-dom";
import "./WhatToEat.scss";

const WhatToEat = ({ wreset, windex, wquestion, woptions, wanswer, wincrement, wadd, wedit }) => {
  const answering = (option) => {
    wanswer.length === windex ? wadd(option) : wedit(option); // 첫 응답 : 응답 수정
    // console.log(answer);
    wincrement();
  };

  const done = (option) => {
    wadd(option);
    // console.log(answer);
    // alert(answer);
  };

  const optionList = woptions[windex].map((option, idx) => (
    <>
      {wanswer.length === wquestion.length ? wreset() : ""}
      {windex !== wquestion.length - 1 ? (
        <NavLink
          to={`/whatToEat`}
          onClick={function () {
            // 응답 진행중
            answering(option);
          }}
          key={idx}
          className="option"
        >
          {option}
        </NavLink>
      ) : (
        <NavLink
          to={`/whatToEatResult`}
          onClick={function () {
            // 마지막 문항 완료
            done(option);
          }}
          key={idx}
          className="option"
        >
          {" "}
          {option}{" "}
        </NavLink>
      )}
    </>
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

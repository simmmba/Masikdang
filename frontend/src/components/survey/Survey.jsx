import React from "react";
import { useSurvey } from "../../contexts/survey";
import { NavLink } from "react-router-dom";
import "./Survey.scss";

const Survey = ({ reset, index, question, options, answer, increment, add, edit }) => {
  const answering = (idx) => {

    answer.length === index ? add(idx) : edit(idx); // 첫 응답 : 응답 수정

    console.log(answer);
    increment();
  };

  const done = (idx) => {
    add(idx);
    console.log(answer);
    // alert(answer);
  };

  const optionList = options[index].map((option, idx) => (
    <>
      {answer.length === 9 ? reset() : ""}
      {index !== question.length - 1 ? (
        <NavLink
          to={`/survey`}
          onClick={function () {
            // 응답 진행중
            answering(idx);
          }}
          key={idx}
          className="option"
        >
          {option}
        </NavLink>
      ) : (
        <NavLink
          to={`/result`}
          onClick={function () {
            // 마지막 문항 완료
            done(idx);
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
      <h3 className="question">{question[index]}</h3>
      <div className="answer">{optionList}</div>
    </div>
  );
};

export default useSurvey(({ state, actions }) => ({
  reset: actions.reset,
  index: state.index,
  question: state.question,
  options: state.options,
  answer: state.answer,
  add: actions.add,
  edit: actions.edit,
  increment: actions.increment,
}))(Survey);

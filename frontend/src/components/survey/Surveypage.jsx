import React from "react";
import Counter from "./Counter";
import Survey from "./Survey";
import "./Survey.scss";

const Surveypage = () => {
  return (
    <div className="SurveyComponent">
      <center>
        <h2 className="top">선호도 조사 페이지</h2>
        <Survey />
        <br />
        <Counter />
      </center>
    </div>
  );
};

export default Surveypage;

import React from "react";
import Counter from "../survey/Counter";
import QuestionNum from "../survey/QuestionNum";
import Survey from "../survey/Survey";
import "../survey/Survey.scss";

const Surveypage = () => {
  return (
    <div className="SurveyComponent">
      <center>
        <QuestionNum />
        <Survey />
        <br />
        <Counter />
      </center>
    </div>
  );
};

export default Surveypage;

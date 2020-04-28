import React from "react";
import "./Recommend.scss";

const Recommend = () => {
  const Emoji = (props) => (
    <span className="emoji" role="img" aria-label={props.label ? props.label : ""} aria-hidden={props.label ? "false" : "true"}>
      {props.symbol}
    </span>
  );

  return (
    <div className="Recommend">
      <div className="title">
        <Emoji id="liked" label="luv" symbol="🍗" /> 내 타입이 비슷하게 평가한 맛집
      </div>
    </div>
  );
};

export default Recommend;

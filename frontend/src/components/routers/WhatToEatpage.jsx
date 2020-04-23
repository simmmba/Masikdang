import React from "react";
import Counter from "../whatToEat/Counter";
import QuestionNum from "../whatToEat/QuestionNum";
import WhatToEat from "../whatToEat/WhatToEat";
import "../whatToEat/WhatToEat.scss";

const WhatToEatpage = () => {
  return (
    <div className="WhatToEatBox">
      <div className="WhatToEatComponent">
        <center>
          <QuestionNum />
          <WhatToEat />
          <br />
          <Counter />
        </center>
      </div>
    </div>
  );
};

export default WhatToEatpage;

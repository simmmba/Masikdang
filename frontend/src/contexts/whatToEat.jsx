import React, { Component, createContext } from "react";
import createUseConsumer from "../libs/createUseConsumer";

const WhatToEatContext = createContext();

const { Provider } = WhatToEatContext;

class WhatToEatProvider extends Component {
  state = {
    windex: 0,
    wquestion: ["누구랑 먹나요?", "성별이 어떻게 되나요?", "나이대가 어떻게 되나요?", "언제 먹나요?", "원하는 가격대가 있나요?", "어디서 먹나요?", "무엇을 먹고싶나요?"],
    woptions: [
      ["혼자", "2인", "3~6인", "단체"],
      ["여자", "남자", "혼합"],
      ["학생", "청년", "어른", "혼합"],
      ["아침", "아점", "점심", "간식", "저녁", "2차", "야식"],
      ["저렴", "보통", "고가", "상관없어요"],
      ["", ""],
      ["한식", "중식", "양식", "일식", "분식", "다좋아"],
    ],
    wanswer: [],
  };

  actions = {
    wreset: () => {
      this.setState(() => ({ windex: 0, wanswer: [] }));
    },
    wincrement: () => {
      this.setState(({ windex }) => ({ windex: windex + 1 }));
    },
    wdecrement: () => {
      this.setState(({ windex }) => ({ windex: windex - 1 }));
    },
    wadd: (select) => {
      this.setState(({ wanswer }) => ({ wanswer: wanswer.concat(select) }));
    },
    wedit: (select) => {
      this.setState(({ wanswer, windex }) => ({ wanswer: wanswer.map((item, idx) => (idx === windex ? select : item)) }));
    },
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };

    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

const { Consumer: WhatToEatConsumer } = WhatToEatContext;
const useWhatToEat = createUseConsumer(WhatToEatConsumer);

export { WhatToEatProvider, WhatToEatConsumer, useWhatToEat, WhatToEatContext };

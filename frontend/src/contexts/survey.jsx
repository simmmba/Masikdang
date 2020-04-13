import React, { Component, createContext } from "react";
import createUseConsumer from "../libs/createUseConsumer";

const SurveyContext = createContext();

const { Provider } = SurveyContext;

class SurveyProvider extends Component {
  state = {
    index: 0,
    question: [
      "어떤 타입을 좋아하나요?",
      "어떤 종류를 좋아하나요?",
      "술 좋아하나요?",
      "어느 시간에 자주 먹나요?",
      "맛집 찾아 멀리 가나요?",
      "비주얼이 중요한가요?",
      "주로 누구랑 먹나요?",
      "가성비 vs 가심비",
      "맛있으면 웨이팅 하나요?",
    ],
    options: [
      ["한식", "중식", "양식", "일식", "분식", "동남아"],
      ["육류", "해산물", "조류", "채소", "잡식"],
      ["좋아함", "안좋아함"],
      ["오전", "오후"],
      ["맛있으면 먹으러 감", "굳이 멀리 가진 않음"],
      ["중요", "맛만 있으면 됨"],
      ["혼자", "친구", "연인", "가족"],
      ["가성비", "가심비"],
      ["웨이팅 함", "기다리는거 싫음"],
    ],
    answer: [],
  };

  actions = {
    reset: () => {
      this.setState(() => ({ index: 0, answer: [] }));
    },
    increment: () => {
      this.setState(({ index }) => ({ index: index + 1 }));
    },
    decrement: () => {
      this.setState(({ index }) => ({ index: index - 1 }));
    },
    add: (select) => {
      this.setState(({ answer }) => ({ answer: answer.concat(select) }));
    },
    edit: (select) => {
      this.setState(({ answer, index }) => ({ answer: answer.map((item, idx) =>(idx === index ? select : item)) }));
    },
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };

    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

const {Consumer: SurveyConsumer} = SurveyContext;
const useSurvey = createUseConsumer(SurveyConsumer);

export { SurveyProvider, SurveyConsumer, useSurvey, SurveyContext };

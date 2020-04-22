import React, { Component, createContext } from "react";
import createUseConsumer from "../libs/createUseConsumer";

const SearchContext = createContext();

const { Provider } = SearchContext;

class SearchProvider extends Component {
  state = {
    word: "",
    subject: "name",
    store:[]
  };

  actions = {
    reset:() => {
      this.setState(() => ({ word: "", subject:"name", store:[] }));
    },
    changeword: (select) => {
      this.setState(() => ({ word: select }));
    },
    changesubject: (select) => {
      this.setState(() => ({ subject: select }));
    },
    getstore: (select) => {
      this.setState(() => ({ store: select }));
    },
    resetstore: () => {
      this.setState(() => ({ store: [] }));
    }
  };

  render() {
    const { state, actions } = this;
    const value = { state, actions };

    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

const {Consumer: SearchConsumer} = SearchContext;
const useSearch = createUseConsumer(SearchConsumer);

export { SearchProvider, SearchConsumer, useSearch, SearchContext };

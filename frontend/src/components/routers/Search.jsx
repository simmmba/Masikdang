import React from "react";
import "./Search.scss";
import axios from "axios";

import Card from "../common/Card";
import AppBar from "../common/AppBar";
import Header from "../common/Header";
import HeaderSearch from "../common/HeaderSearch";

import { SearchContext } from "../../contexts/search";

const Emoji = (props) => (
  <span
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
  >
    {props.symbol}
  </span>
);

class Search extends React.Component {
  static contextType = SearchContext;

  constructor(props) {
    super(props);
    this.state = {
      word: "",
      subject: "name",
      stores: [],
      store_len: -1,
    };
  }

  componentDidMount() {
    this.setState({ store_len: -1 });
    this.getStores();
  }

  componentDidUpdate() {
    if (this.state.word !== this.context.state.word) {
      this.setState({
        store_len: -1,
      });
      this.getStores();
    }
  }

  getStores = () => {

    var word = this.context.state.word;
    var subject = this.context.state.subject;

    this.setState({
      word: word,
      subject: subject,
    });

    if (word === "") {
      word = "역삼";
      subject = "area";
    }

    //axios 호출
    axios({
      method: "get",
      url: "http://15.165.19.70:8080/api/store/search",
      params: {
        word: word,
        subject: subject,
      },
    })
      // 회원 가입 안되있는 거면
      .then((res) => {
        this.setState({
          stores: res.data,
          store_len: res.data.length,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="Box">
        <Header></Header>
        <HeaderSearch></HeaderSearch>
        <div className="Search">
          {this.state.store_len === -1 ? (
            <div className="store_len">
              <Emoji label="time" symbol="⏱" />
              <span> 식당을 검색 중입니다.</span>
            </div>
          ) : (
            <>
              {this.state.store_len === 0 ? (
                <div className="store_len">
                  <Emoji label="sad" symbol="😥" />
                  <span> 검색된 식당이 없습니다.</span>
                </div>
              ) : (
                <div className="store_len">
                  <Emoji label="search" symbol="🏠" />
                  <span>
                    {" "}
                    {this.state.store_len}개의 식당이 검색되었습니다.
                  </span>
                </div>
              )}
            </>
          )}

          {this.state.stores.map((store) => (
            <div className="card_item" key={store.id}>
              <Card store={store}></Card>
            </div>
          ))}
        </div>
        <AppBar></AppBar>
      </div>
    );
  }
}

export default Search;

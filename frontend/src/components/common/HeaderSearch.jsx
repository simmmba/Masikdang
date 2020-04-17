import React from "react";
import "./HeaderSearch.scss";
import { withRouter } from "react-router-dom";
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

class HeaderSearch extends React.Component {
  static contextType = SearchContext;

  constructor(props) {
    super(props);
    this.state = {
      word: "",
      subject: "name",
    };
  }

  componentDidMount() {
    // home 이나 다른 곳으로 오면 검색 reset
    const url = window.location.href.split("/");
    const now_url = url[url.length - 1];
    if (now_url === "home" || now_url === "map" || now_url === "mypage") {
      this.context.actions.reset();
    } else if (
      this.context.state.word !== "" &&
      this.context.state.word !== null
    ) {
      this.setState({
        word: this.context.state.word,
        subject: this.context.state.subject,
      });
    }
  }

  // subject 선택
  selectSubject = (res) => {
    this.setState({
      subject: res.target.value,
    });
  };

  // input 작성
  changeInput = (res) => {
    this.setState({
      word: res.target.value,
    });
  };

  clicksearch = () => {
    const { history } = this.props;
    this.context.actions.changeword(this.state.word);
    this.context.actions.changesubject(this.state.subject);

    history.push({
      pathname: "/search",
      state: { word: this.state.word, subject: this.state.subject },
    });
  };

  whatToEat = () => {

    const { history } = this.props;
    history.push({
      pathname: "/whatToEat",
    });
  }

  render() {
    return (
      <>
        <div className="HeaderSearch">
          <div className="container-fluid">
            <div className="row">
              <div className="btn test2 col-1" onClick={this.whatToEat}>
                <Emoji label="search" symbol="🍔" />
              </div>
              <div className="input col-10">
                <select
                  className="input_subject"
                  onChange={this.selectSubject}
                  value={this.state.subject}
                >
                  <option value="name">식당명</option>
                  <option value="area">지역</option>
                  <option value="category">카테고리</option>
                </select>
                <input
                  type="text"
                  className="search_input"
                  placeholder="검색어를 입력해주세요."
                  onChange={this.changeInput}
                  value={this.state.word}
                />
              </div>
              <div className="btn search_btn col-1" onClick={this.clicksearch}>
                <Emoji label="search" symbol="🔎" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(HeaderSearch);

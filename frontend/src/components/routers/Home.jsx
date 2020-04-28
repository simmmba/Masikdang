import React from "react";
import "./Home.scss";

import AppBar from "../common/AppBar";
import Header from "../common/Header";
import HeaderSearch from "../common/HeaderSearch";
import AboutGo from "../home/AboutGo";
import LikedMap from "../home/LikedMap";
import Recommend from "../home/Recommend";

const Emoji = (props) => (
  <span className="emoji" role="img" aria-label={props.label ? props.label : ""} aria-hidden={props.label ? "false" : "true"}>
    {props.symbol}
  </span>
);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
    };
  }

  componentDidMount() {
    if (window.sessionStorage.getItem("user")) {
      this.setState({
        login: true,
      });
    }
  }

  render() {
    return (
      <div className="Box">
        <Header />
        <HeaderSearch />
        <div className="Home">
          <AboutGo />
          <div className="title">
            <Emoji id="liked" label="chicken" symbol="🍗" /> 내 타입이 비슷하게 평가한 맛집
          </div>
          <Recommend />
          <div className="title">
            <Emoji id="liked" label="luv" symbol="❤️" /> 현위치 즐겨찾기 맛집
          </div>
          <LikedMap />
        </div>
        <AppBar />
      </div>
    );
  }
}

export default Home;

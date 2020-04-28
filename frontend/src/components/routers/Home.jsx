import React from "react";
import "./Home.scss";

import AppBar from "../common/AppBar";
import Header from "../common/Header";
import HeaderSearch from "../common/HeaderSearch";
import AboutGo from "../home/AboutGo";
import LikedMap from "../home/LikedMap";

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
        <Header></Header>
        <HeaderSearch></HeaderSearch>
        <div className="Home">
          <AboutGo></AboutGo>
          <div className="likedmap_title">
          <Emoji id="liked" label="luv" symbol="❤️" /> 주변 즐겨찾기한 맛집
        </div>
          <LikedMap></LikedMap>
        </div>
        <AppBar></AppBar>
      </div>
    );
  }
}

export default Home;

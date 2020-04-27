import React from "react";
import "./Home.scss";

import AppBar from "../common/AppBar";
import Header from "../common/Header";
import HeaderSearch from "../common/HeaderSearch";
import About from "../home/About";
import LikedMap from "../home/LikedMap";

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
          <About></About>
          <LikedMap></LikedMap>
        </div>
        <AppBar></AppBar>
      </div>
    );
  }
}

export default Home;

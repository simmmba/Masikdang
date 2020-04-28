import React from "react";
import "./Home.scss";

import AppBar from "../common/AppBar";
import Header from "../common/Header";
import HeaderSearch from "../common/HeaderSearch";
import About from "../home/About";
import LikedMap from "../home/LikedMap";
import Recommend from "../home/Recommend";

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
          <About />
          <Recommend />
          <LikedMap />
        </div>
        <AppBar />
      </div>
    );
  }
}

export default Home;

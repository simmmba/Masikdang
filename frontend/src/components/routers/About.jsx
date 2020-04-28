import React from "react";
import "./About.scss";

import AppBar from "../common/AppBar";
import Header from "../common/Header";
import ScrollToTop from "../common/ScrollToTop";
import Intro from "../home/Intro";
import Feature from "../home/Feature"

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
    };
  }

  onClickBig = () => {
    this.setState({
      check: !this.state.check,
    });
  };



  render() {
    return (
      <div className="Box">
        <Header></Header>
        <ScrollToTop></ScrollToTop>
        <div className="About">
          <Intro onClickBig={this.onClickBig}></Intro>
          <Feature></Feature>
          <Feature></Feature>
          <Feature></Feature>
          <Feature></Feature>
        </div>
        <AppBar></AppBar>
      </div>
    );
  }
}

export default About;

import React from "react";
import { NavLink } from "react-router-dom";

import AppBar from "../common/AppBar";
import Header from "../common/Header";

import "./Mypage.scss";

class Mypage extends React.Component {
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

  logout = () => {
    alert("로그아웃 되었습니다");
    window.sessionStorage.clear();
  };

  render() {
    return (
      <div className="Box">
        <Header></Header>
        <div className="Mypage">
          <div className="profile_img">
            <img alt="프로필" src="https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png" />
          </div>
          {this.state.login ? (
            <a href="/home" onClick={this.logout}>
              로그아웃
            </a>
          ) : (
            <>
              <NavLink to="/signup">회원가입</NavLink>
              <br />
              <NavLink to="/login">로그인</NavLink>
            </>
          )}
        </div>
        <AppBar></AppBar>
      </div>
    );
  }
}

export default Mypage;

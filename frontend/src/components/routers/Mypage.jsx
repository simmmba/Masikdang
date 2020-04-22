import React from "react";
import AppBar from "../common/AppBar";
import Header from "../common/Header";

import "./Mypage.scss";

class Mypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      nickname: "",
      survey_result: "",
    };
  }

  componentDidMount() {
    if (window.sessionStorage.getItem("user")) {
      let user = JSON.parse(window.sessionStorage.getItem("user"));
      console.log(user);

      this.setState({
        login: true,
        nickname: user.nickname,
        survey_result: user.survey_result,
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
          {this.state.login && (
            <div>
              <div className="profile_img">
                <img alt="프로필" src="https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png" />
              </div>
              <div>
                <span className="nickname">{this.state.nickname}</span> 님 안녕하세요!
              </div>
              <br />
              <div>{this.state.nickname}님의 마식는 타입은</div>
              <span className="type">{this.state.survey_result}</span>
              <div>입니다.</div>
              <br />
            </div>
          )}
          {this.state.login ? (
            <div className="btnBox">
              <div>
                <a className="btn" href="/mypage/detail">
                  내 정보 조회
                </a>
              </div>
              <div>
                <a className="btn" href="/home" onClick={this.logout}>
                  로그아웃
                </a>
              </div>
            </div>
          ) : (
            <div className="loginBox">
              <a className="joinBtn" href="/signup">
                회원가입
              </a>
              <a className="loginBtn" href="/login">
                로그인
              </a>
            </div>
          )}
        </div>
        <AppBar></AppBar>
      </div>
    );
  }
}

export default Mypage;

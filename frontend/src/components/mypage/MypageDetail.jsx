import React from "react";
// import axios from "axios";
// import Http from "../../api";
// import { NavLink } from "react-router-dom";
import "./MypageDetail.scss";

import AppBar from "../common/AppBar";
import Header from "../common/Header";

class MypageDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      age: 1,
      gender: "",
      provider: "",
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
        age: user.age,
        gender: user.gender,
        provider: user.provider,
        nickname: user.nickname,
        survey_result: user.survey_result,
      });
    }
  }

  render() {
    return (
      <div className="Box">
        <Header></Header>
        <div className="MypageDetail">
          <div className="profile_img">
            <img alt="프로필" src="https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png" />
          </div>
          <div className="profileBox">
            <div className="column">
              <div className="box">닉네임</div>
              <div className="box">가입 경로</div>
              <div className="box">성별</div>
              <div className="box">나이</div>
              <div className="box">마식는 타입</div>
            </div>
            <div className="value">
              <div className="box">{this.state.nickname}</div>
              <div className="box">{this.state.provider}</div>
              <div className="box">{this.state.gender}</div>
              <div className="box">{this.state.age}</div>
              <div className="box">{this.state.survey_result}</div>
            </div>
          </div>
        </div>
        <AppBar></AppBar>
      </div>
    );
  }
}

export default MypageDetail;

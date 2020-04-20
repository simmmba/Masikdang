import React from "react";
import "./Detail.scss";
import axios from "axios";

import AppBar from "../common/AppBar";
import Header from "../common/Header";
import HeaderSearch from "../common/HeaderSearch";
import ImageList from "../common/ImageList";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      store: [],
    };
  }

  componentDidMount() {
    // 로그인 확인
    if (window.sessionStorage.getItem("user")) {
      this.setState({
        login: true,
      });
    }

    // url 확인, axois 호출
    const url = window.location.href.split("/");
    // url.length - 1
    axios({
      method: "get",
      url: "http://15.165.19.70:8080/api/store/detail",
      params: {
        store_id: url[url.length - 1],
      },
    })
      // 회원 가입 안되있는 거면
      .then((res) => {
        console.log(res.data);
        this.setState({
          store: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="Box">
        <Header></Header>
        <HeaderSearch></HeaderSearch>
        <div className="Detail">
          <div className="container-fluid">
            <div className="row">
              <div className="store_image col-12 col-md-7">
                <ImageList></ImageList>
              </div>
              <div className="col-12 col-md-5">
                <div className="store_info">
                  <div className="store_name">
                    {this.state.store.store_name}
                  </div>
                  <br/>
                  <div className="address">{this.state.store.address}</div>
                  <div className="tel">{this.state.store.tel}</div>
                  <div className="category">{this.state.store.category}</div>
                </div>
              </div>
              <div className="store_map"></div>
              <div className="store_reviews"></div>
            </div>
          </div>
        </div>
        <AppBar></AppBar>
      </div>
    );
  }
}

export default Detail;

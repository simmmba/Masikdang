import React from "react";
import "./Detail.scss";
import axios from "axios";

import AppBar from "../common/AppBar";
import Header from "../common/Header";
import HeaderSearch from "../common/HeaderSearch";
import ImageList from "../detail/ImageList";
import ReadScore from "../detail/ReadScore";
import Liked from "../common/Liked";
import Map from "../detail/Map";
import Review from "../detail/Review";
import store_img from "../../img/store.png";
import ScrollToTop from "../common/ScrollToTop"

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

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      store: [],
      category: [],
      img_list: [store_img],
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
      url: "http://15.165.19.70:8080/api/store/"+ url[url.length - 1],
    })
      .then((res) => {
        console.log(res.data);
        this.setState({
          store: res.data,
          category: res.data.category.split("|"),
        });
      })
      .catch((error) => {
        console.log(error);
        // alert("현재 정보를 받아오지 못하고 있습니다")
      });
  }

  render() {
    return (
      <div className="Box">
        <Header></Header>
        <HeaderSearch></HeaderSearch>
        <ScrollToTop></ScrollToTop>
        <div className="Detail">
          <div className="container-fluid">
            <div className="row">
              <div className="store_image col-12 col-md-8">
                {/* 이미지 넣어주는 부분 */}
                {this.state.store.img !== null ? (
                  <ImageList img_list={this.state.store.img}></ImageList>
                ) : (
                  <ImageList img_list={this.state.img_list}></ImageList>
                )}
              </div>
              <div className="col-12 col-md-4">
                <div className="store_info">
                  <div className="store_name">
                    {this.state.store.store_name}
                  </div>
                  {/* 지역, 카테고리 class 이름 바꾸기 */}
                  <div className="tags">
                    {this.state.store.area}
                    {this.state.category.map((item) => (
                      <span key={item}>, {item}</span>
                    ))}
                  </div>
                  {/* 위치, 크기 조정하기 */}
                  <div className="tel">{this.state.store.tel}</div>
                  <div className="store_score">
                    <div className="score_text">3.7</div>
                    <ReadScore></ReadScore>
                  </div>
                  <div className="liked_item button">
                    <Liked></Liked>
                  </div>
                  <div className="evaluation button">평가하기</div>
                </div>
              </div>
            </div>
            {/* 리뷰 리스트 */}
            <div className="store_review_bundle">
              <div className="review_no_info">
                <span>2</span>건의 방문자 평가
              </div>
              <Review></Review>
              <Review></Review>
              <div className="reade_maore">더보기</div>
            </div>
            <div className="store_detail_info"></div>
            <div className="store_map">
              <div className="address">
                <Emoji label="map" symbol="🚩" /> {this.state.store.address}
              </div>
              <Map
                latitude={this.state.store.latitude}
                longitude={this.state.store.longitude}
              ></Map>
            </div>
          </div>
        </div>
        <AppBar></AppBar>
      </div>
    );
  }
}

export default Detail;

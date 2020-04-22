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
import ScrollToTop from "../common/ScrollToTop";

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
      review_img_len: 0,
      review: [],
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

    // 가게 정보 받아오는 axios
    axios({
      method: "get",
      url: "http://15.165.19.70:8080/api/store/" + url[url.length - 1],
    })
      .then((res) => {
        console.log(res.data);
        let category_list = [];
        if (res.data.category !== null)
          category_list = res.data.category.split("|");
        this.setState({
          store: res.data,
          category: category_list,
          review_img_len: res.data.review_img.length,
        });
      })
      .catch((error) => {
        console.log(error);
        // alert("현재 정보를 받아오지 못하고 있습니다")
      });

    // 리뷰 받아오는 axios
    axios({
      method: "get",
      url: "http://15.165.19.70:8080/api/review/" + url[url.length - 1],
    })
      .then((res) => {
        console.log(res.data);
        this.setState({
          review: res.data,
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
                {this.state.review_img_len !== 0 ? (
                  <ImageList img_list={this.state.store.review_img}></ImageList>
                ) : (
                  <>
                    {this.state.store.img !== null ? (
                      <ImageList img_list={[this.state.store.img]}></ImageList>
                    ) : (
                      <ImageList img_list={this.state.img_list}></ImageList>
                    )}
                  </>
                )}
              </div>
              <div className="col-12 col-md-4">
                {/* 가게 정보 표시 */}
                <div className="store_info">
                  <div className="store_name">
                    {this.state.store.store_name}
                  </div>
                  <div className="tags">
                    {this.state.store.area} &nbsp;
                    {this.state.category.map((item, index) => (
                      <span key={index}>
                        {item}
                        {index !== this.state.category.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                                    {/* 평균 점수 */}
                                    <div className="store_score">
                    {this.state.store.avg_score !== null ? (
                      <>
                        <div className="score_text">
                          {/* ERROR */}
                          {String(
                            Math.round(this.state.store.avg_score * 10) / 10
                          )}
                          {/* ERROR */}
                        </div>
                        <ReadScore
                          score={this.state.store.avg_score}
                        ></ReadScore>
                      </>
                    ) : (
                      <>
                        <div className="score_text">{0}</div>
                        <ReadScore score={0}></ReadScore>
                      </>
                    )}
                  </div>
                  {/* 메뉴 리스트 */}
                  <div className="menu_list">
                    {this.state.store.menu &&
                      this.state.store.menu.length !== 0 &&
                      this.state.store.menu.map((menu, index) => (
                        <div key={index} className="menu">
                          <Emoji label="menu" symbol="🍳" /> {menu.menu} :{" "}
                          {menu.price}
                        </div>
                      ))}
                  </div>
                  {/* 영업시간 */}
                  <div className="time">
                    <div className="start_end_time">
                      {this.state.store.bhour &&
                        this.state.store.bhour.map((bhour, index) => (
                          <div key={index}>
                            <Emoji label="calendar" symbol="📆"/>&nbsp;
                            {bhour.mon === 1 && "월 "}
                            {bhour.tue === 1 && "화 "}
                            {bhour.wed === 1 && "수 "}
                            {bhour.thu === 1 && "목 "}
                            {bhour.fri === 1 && "금 "}
                            {bhour.sat === 1 && "토 "}
                            {bhour.sun === 1 && "일 "}
                            {bhour.start_time} {"~"} {bhour.end_time}
                            <div className="time_etc">{bhour.etc}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                  {/* 전화 */}
                  <div className="tel">
                    {this.state.store.tel && (
                      <>
                        <Emoji label="tel" symbol="📞" /> {this.state.store.tel}
                      </>
                    )}
                  </div>
                  {/* tag 모음 */}
                  <div className="tags">
                    {this.state.store.tags &&
                      this.state.store.tags.length !== 0 && (
                        <>
                          <Emoji label="map" symbol="📢" />{" "}
                          {this.state.store.tags.map((tag, index) => (
                            <span key={index}>
                              {tag}
                              {index !== this.state.store.tags.length - 1
                                ? ", "
                                : ""}
                            </span>
                          ))}
                        </>
                      )}
                  </div>
                  {/* 즐겨찾기 */}
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
                {this.state.review && <span>{this.state.review.length}</span>}
                건의 방문자 평가
              </div>
              {this.state.review.map((review, index) => (
                <Review key={index} review={review}></Review>
              ))}
              <div className="reade_maore">더보기</div>
            </div>
            {/* 주소 + 지도 표시 */}
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

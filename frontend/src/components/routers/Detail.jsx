import React from "react";
import "./Detail.scss";
import axios from "axios";

import AppBar from "../common/AppBar";
import Header from "../common/Header";
import HeaderSearch from "../common/HeaderSearch";
import ImageList from "../detail/ImageList";
import ReadScore from "../detail/ReadScore";
import Liked from "../common/Liked";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      store: [],
      category: [],
      img_list: [
        "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20191214013944_photo1_3b4aadf8a61f.jpg",
        "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/300_300_20191214013944_photo2_3b4aadf8a61f.jpg",
        "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/300_300_20190720012714_photo1_4190537b5b1e.jpg",
        "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/300_300_20190720012714_photo2_4190537b5b1e.jpg",
        "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/300_300_20190720012714_photo3_4190537b5b1e.jpg",
        "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/300_300_20190519140914_photo0_wMWmpwgnAl79.jpg",
        "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/300_300_20190519140914_photo1_wMWmpwgnAl79.jpg",
        "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/300_300_20190519020742_photo3_f894408f4c7d.jpg",
        "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20170718045937_photo2_43ee64e3a8a1.jpg",
      ],
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
        <div className="Detail">
          <div className="container-fluid">
            <div className="row">
              <div className="store_image col-12 col-md-8">
                {this.state.store.img !== null &&
                this.state.store.img !== undefined ? (
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

                  <div className="tags">
                    {this.state.store.area}
                    {this.state.category.map((item) => (
                      <span key={item}>, {item}</span>
                    ))}
                  </div>
                  <div className="tel">{this.state.store.tel}</div>
                  <div className="score_text">
                    <ReadScore></ReadScore>
                  </div>
                  <div className="liked_item button">
                    <span>
                      <Liked></Liked>
                    </span>
                    &nbsp;&nbsp;&nbsp;좋아요&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="evaluation button">평가하기</div>
                </div>
              </div>
            </div>
            <div>
              <br />
              😊 이 음식점의 평가결과는 신뢰할 수 있을 만큼 이루어졌습니다.
              <br />
              ※홍보 및 비방 등 부적절한 평가는 평점 산정에서 제외될수있습니다.
              <br />
            </div>
            {/* 리뷰 리스트 */}
            <div className="store_reviews">
              <br />
              <br />
              <div>리뷰 리스트 들어 갈 자리</div>
              <br />
              <br />
            </div>
            <div className="store_detail_info">
              <div className="address">🚩 {this.state.store.address}</div>
            </div>
            <div className="store_map"></div>
          </div>
        </div>
        <AppBar></AppBar>
      </div>
    );
  }
}

export default Detail;

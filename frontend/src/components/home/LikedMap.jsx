import React from "react";
import "./LikedMap.scss";
import axios from "axios";
import { withRouter } from "react-router-dom";

import Loading from "../map/Loading";
import CarouselSlider from "../common/CarouselSlider";

const Emoji = (props) => (
  <span className="emoji" role="img" aria-label={props.label ? props.label : ""} aria-hidden={props.label ? "false" : "true"}>
    {props.symbol}
  </span>
);

class LikedMap extends React.Component {
  constructor(props) {
    super(props);

    // 초기 값을 멀티캠퍼스 역삼으로 설정
    this.state = {
      latitude: 37.501503,
      longitude: 127.039778,
      check: false,
      stores: [],
      loading: false,
    };
  }

  markers = [];
  map = "";
  user = JSON.parse(window.sessionStorage.getItem("user"));

  componentDidMount() {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            check: true,
          });
          // this.makeMap();
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      this.makeMap();
      alert("GPS를 지원하지 않아 현재위치를 가져올 수 없습니다");
    }

    this.makeMap();
  }

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  addMarker = (position, idx) => {
    console.log(idx);
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new window.kakao.maps.Size(36, 37), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new window.kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new window.kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      });

    marker.setMap(this.map); // 지도 위에 마커를 표출합니다
    this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
  };

  // 현 정보 기반 새로운 식당 정보 받아오기
  axiosStores = () => {
    //Loading 표시
    this.setState({
      loading: true,
    });

    // axios 호출
    axios({
      method: "get",
      url: "http://15.165.19.70:8080/api/location_based/" + this.user.id + "/" + String(this.state.latitude) + "/" + String(this.state.longitude) + "/2",
    })
      .then((res) => {
        console.log(res);

        for (var i = 0; i < res.data.data.length; i++) {
          // 마커를 생성하고 지도에 표시합니다
          var placePosition = new window.kakao.maps.LatLng(res.data.data[i].latitude, res.data.data[i].longitude),
            marker = this.addMarker(placePosition, i);
        }
        this.setState({
          stores: res.data.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  makeMap = () => {
    var container = document.getElementById("map");
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(this.state.latitude, this.state.longitude), //지도의 중심좌표.
      level: 5, //지도의 레벨(확대, 축소 정도)
    };

    //  지도 생성
    this.map = new window.kakao.maps.Map(container, options);

    // 로그인했을때만 불러오기
    if (this.user) {
      this.axiosStores();
    }
  };

  render() {
    return (
      <div className="LikedMap">
        <div className="thumbnail">
          <div id="square" className="centered">
            <div id="map" className="kakaoMap"></div>
          </div>
        </div>
        {!this.user && (
          <div className="login">
            <Emoji label="map" symbol="✔️" /> 로그인 후 즐겨찾기한 맛집을 확인해보세요!
          </div>
        )}

        <div>
          {this.state.loading ? (
            <Loading></Loading>
          ) : (
            <>
              {this.state.stores && this.user && (
                <div>
                  <CarouselSlider similar={this.state.stores}></CarouselSlider>
                </div>
              )}
              {this.state.stores.length === 0 && this.user && (
                <div className="no_store">
                  <Emoji label="map" symbol="⚙" /> 현위치에서 검색된 식당이 없습니다
                </div>
              )}
              {this.user && (
                <div className="more" onClick={() => this.props.history.push("/mypage/favorite")}>
                  <Emoji label="map" symbol="➕" /> 즐겨찾기한 식당 더보기
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(LikedMap);

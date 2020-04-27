import React from "react";
import "./NearMap.scss";
import axios from "axios";

import MapCard from "../map/MapCard";
import Loading from "../map/Loading";

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

class NearMap extends React.Component {
  constructor(props) {
    super(props);

    // 초기 값을 멀티캠퍼스 역삼으로 설정
    this.state = {
      latitude: 37.501503,
      longitude: 127.039778,
      check: false,
      level: 5,
      address: "",
      stores: [],
      loading: false,
    };
  }

  level_km = [0.01, 0.02, 0.05, 0.1, 0.5, 1, 2, 4, 8, 16, 16, 16, 16, 16, 16];
  markers = [];
  map = "";

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
          this.axiosStores();

          // 좌표 기반으로 현위치 찍기
          var callback = (result, status) => {
            if (status === window.kakao.maps.services.Status.OK)
              this.setState({
                address: result[0].address_name,
              });
          };
          new window.daum.maps.services.Geocoder().coord2RegionCode(
            position.coords.longitude,
            position.coords.latitude,
            callback
          );

          this.makeMap();
        },
        function (error) {
          console.error(error);
          this.makeMap();
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않아 현재위치를 가져올 수 없습니다");
      this.makeMap();
    }
  }

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  addMarker = (position, idx) => {
    var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new window.kakao.maps.Size(36, 37), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new window.kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imgOptions
      ),
      marker = new window.kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      });

    marker.setMap(this.map); // 지도 위에 마커를 표출합니다
    this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
  };

  // 표시되어 있는 마커 삭제
  removeMarker = () => {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  };

  // 현 정보 기반 새로운 식당 정보 받아오기
  axiosStores = () => {
    // 기존마커 지우기
    this.removeMarker();
    //Loading 표시
    this.setState({
      loading: true,
    });

    // axios 호출
    axios({
      method: "get",
      url:
        "http://15.165.19.70:8080/api/location_based/" +
        String(this.state.latitude) +
        "/" +
        String(this.state.longitude) +
        "/" +
        String(this.level_km[this.state.level]),
    })
      .then((res) => {
        console.log(res);

        for (var i = 0; i < res.data.data.length; i++) {
          // 마커를 생성하고 지도에 표시합니다
          var placePosition = new window.kakao.maps.LatLng(
              res.data.data[i].latitude,
              res.data.data[i].longitude
            ),
            marker = this.addMarker(placePosition, i);
          // console.log(marker);
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
      center: new window.kakao.maps.LatLng(
        this.state.latitude,
        this.state.longitude
      ), //지도의 중심좌표.
      level: this.state.level, //지도의 레벨(확대, 축소 정도)
    };

    //  지도 생성
    this.map = new window.kakao.maps.Map(container, options);

    // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
    window.kakao.maps.event.addListener(this.map, "click", (mouseEvent) => {
      this.setState({
        latitude: this.map.getCenter().Ha,
        longitude: this.map.getCenter().Ga,
      });
      searchDetailAddrFromCoords(mouseEvent.latLng, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          this.setState({
            address:
              result[0].address.region_1depth_name +
              " " +
              result[0].address.region_2depth_name +
              " " +
              result[0].address.region_3depth_name,
          });
        }
      });
      // 좌표로 법정동 상세 주소 정보를 요청
      function searchDetailAddrFromCoords(coords, callback) {
        new window.kakao.maps.services.Geocoder().coord2Address(
          coords.getLng(),
          coords.getLat(),
          callback
        );
      }
      this.axiosStores();
    });

    // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
    window.kakao.maps.event.addListener(this.map, "zoom_changed", () => {
      // 지도의 현재 레벨을 얻어옵니다
      var level = this.map.getLevel();
      this.setState({
        level: level,
      });
    });
  };

  render() {
    return (
      <div className="NearMap">
        {!this.state.check && this.state.address !== "" ? (
          <div className="address">
            <Emoji label="map" symbol="⚙"/> 현재 위치를 알 수 없습니다.
          </div>
        ):<div className="address"><Emoji label="map" symbol="⚙"/> {this.state.address}</div>}
        
        <div className="thumbnail">
          <div id="square" className="centered">
            <div id="map" className="kakaoMap"></div>
          </div>
        </div>
        <div className="address"><Emoji label="map" symbol="✔️" /> 지도 클릭하면 새로운 식당 정보를
        받아옵니다</div>
        <div>
          {this.state.loading ? (
            <Loading></Loading>
          ) : (
            <>
              {this.state.stores.map((store, index) => (
                <MapCard
                  key={index}
                  id={index}
                  index={index + 1}
                  store={store}
                ></MapCard>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default NearMap;

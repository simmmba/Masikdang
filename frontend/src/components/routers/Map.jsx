import React from "react";
import "./Map.scss";

import AppBar from "../common/AppBar";
import Header from "../common/Header";

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

class Map extends React.Component {
  componentDidMount() {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          alert(position.coords.latitude + " " + position.coords.longitude);
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
      alert("GPS를 지원하지 않습니다");
    }
  }
  render() {
    return (
      <div className="Box">
        <Header></Header>
        <div className="Map">
          <div className="title"><Emoji label="map" symbol="🗺️" /> 내 주변 맛집 정보</div>
          <div>&nbsp;&nbsp;&nbsp;⚙ 현재 위치를 알 수 없습니다.</div>
        </div>
        <AppBar></AppBar>
      </div>
    );
  }
}

export default Map;

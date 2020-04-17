import React from "react";
import "./Search.scss";

import AppBar from "../common/AppBar";
import Header from "../common/Header";

class Map extends React.Component {

  render() {
    return (
      <div className="Box">
        <Header></Header>
        <div className="Map">

        </div>
        <AppBar></AppBar>
      </div>
    );
  }
}

export default Map;

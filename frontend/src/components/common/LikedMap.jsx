import React from "react";
import "./LikedMap.scss";

import { withRouter } from "react-router-dom";

class LikedMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   check: 0,
      //   store: 0,
    };
  }

  componentDidMount() {
    this.setState({
      //   check: this.props.like,
      //   store: this.props.store,
    });
  }

  componentDidUpdate(prevProps) {}

  user = JSON.parse(window.sessionStorage.getItem("user"));

  render() {
    return <div className="LikedMap"></div>;
  }
}

export default withRouter(LikedMap);

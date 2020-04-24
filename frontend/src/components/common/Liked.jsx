import React from "react";
import "./Liked.scss";

import { withRouter } from "react-router-dom";

const Emoji = (props) => (
  <span
    id="liked"
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
  >
    {props.symbol}
  </span>
);

class Liked extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props)
    this.state = {
      check: false,
    };
  }

  user = JSON.parse(window.sessionStorage.getItem("user"));

  clickItem = (res) => {
    // 로그인 체크
    if (this.user) {
      if (res.target.id === "liked") {
        // 클릭 했으면 반대로
        this.setState({
          check: !this.state.check,
        });
      }
    } else {
      if (
        window.confirm(
          "로그인을 해야 사용 가능한 기능입니다.\n로그인하시겠습니까?"
        )
      ) {
        this.props.history.push("/login");
      }
    }
  };

  render() {
    return (
      <div id="liked" className="Liked" onClick={this.clickItem}>
        {this.state.check ? (
          <div id="liked" className="liked">
            <Emoji id="liked" label="luv" symbol="❤️" />
          </div>
        ) : (
          <div id="liked" className="liked">
            <Emoji id="liked" label="luv" symbol="💙" />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Liked);

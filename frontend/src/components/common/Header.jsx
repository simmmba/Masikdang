import React from "react";
import "./Header.scss";
import logo from "../../img/logo6.png";
import { NavLink } from "react-router-dom";

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

class Header extends React.Component {
  
  render() {
    return (
      <>
        <div className="Header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-3"></div>
              <div className="logo col-6"><NavLink to="/"><img alt="logo" src={logo}></img></NavLink></div>
              <div className="col-3 survey1_btn"><NavLink to="/survey">설문 <Emoji label="gogo" symbol="👉🏻" /></NavLink></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Header;

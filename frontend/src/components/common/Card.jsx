import React from "react";
import "./Card.scss";
import { withRouter } from "react-router-dom";
import Liked from "../common/Liked"
import store_img from "../../img/store.png"

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: this.props.store,
    };
  }

  clickItem = (res) => {

    // console.log(res.target.id)

    const { history } = this.props;
    if (res.target.id === "evaluation") history.push("/home");
    else if (res.target.id !== "liked") history.push("/search/" + this.state.store.id);
  };

  //<Link to={{ pathname: `/search/${store.id}` }}>

  render() {
    return (
      <div className="Card">
        <div id="square" className="bounceIn flipInY animated" onClick={this.clickItem}>
          <div className="thumbnail">
            <div className="centered">
              <img
                alt="food"
                className="img"
                src={this.state.store.img?this.state.store.img:store_img}
              />
            </div>
          </div>
          <div className="text">
            <div className="title">{this.state.store.store_name}</div>
            <div id="liked" className="liked_item"><Liked></Liked></div>
            <div className="category">{this.state.store.address}</div>
            <div id="evaluation" className="evaluation">
              평가하기
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Card);

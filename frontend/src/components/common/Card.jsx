import React from "react";
import "./Card.scss";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: this.props.store,
    };
  }

  render() {
    return (
      <div className="Card">
        <div className="thumbnail">
          <div className="centered">
            <img
              alt="food"
              src="https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20190403113840_photo1_c1065c77dbac.jpg"
            />
          </div>
        </div>
        <div className="text">
          <div className="title">{this.state.store.store_name}</div>
          <div className="zzim">♥</div>
          <div className="category">{this.state.store.address}</div>
        </div>
      </div>
    );
  }
}

export default Card;

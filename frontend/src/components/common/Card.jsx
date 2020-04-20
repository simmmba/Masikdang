import React from "react";
import "./Card.scss";
import { withRouter } from "react-router-dom";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: this.props.store,
    };
  }

  godetail = () => {
    const {history} = this.props; 
    history.push("/search/" + this.state.store.id);
  }

  evaluate = () => {
    const {history} = this.props; 
    history.push("/");
  }

  //<Link to={{ pathname: `/search/${store.id}` }}>

  render() {
    return (
      <div className="Card" onClick={this.godetail}>
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
          <div className="liked">★</div>
          <div className="category">{this.state.store.address}</div>
          <div id="evaluation" className="evaluation">평가하기</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Card);

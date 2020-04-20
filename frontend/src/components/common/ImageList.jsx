import React from "react";
import "./ImageList.scss";
// import { withRouter } from "react-router-dom";

class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: this.props.store,
      index: 0
    };
  }
  //<Link to={{ pathname: `/search/${store.id}` }}>

  render() {
    return (
      <div className="ImageList">
        <div className="thumbnail">
          <div className="centered">
            <img
              alt="food"
              src="https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20190403113840_photo1_c1065c77dbac.jpg"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ImageList;

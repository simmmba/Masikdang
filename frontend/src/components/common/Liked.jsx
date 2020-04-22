import React from "react";
import "./Liked.scss";

class Liked extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props)
    this.state = {
      check: false,
    };
  }

  clickItem = (res) => {
    if (res.target.id === "liked") {
      this.setState({
        check: !this.state.check
      });
    }
  };

  //<Link to={{ pathname: `/search/${store.id}` }}>

  render() {
    return (
      <div id="liked" className="Liked" onClick={this.clickItem}>
        {this.state.check ? (
          <div id="liked" className="liked">
            ♥
          </div>
        ) : (
          <div id="liked" className="liked">
            ♡
          </div>
        )}
      </div>
    );
  }
}

export default Liked;

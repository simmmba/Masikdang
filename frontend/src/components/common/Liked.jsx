import React from "react";
import "./Liked.scss";

class Liked extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: this.props.store,
    };
  }

  clickItem = (res) => {
    const { history } = this.props;
    if (res.target.id === "evaluation") history.push("/home");
    else if (res.target.id === "liked") history.push("/home");
    else history.push("/search/" + this.state.store.id);
  };

  //<Link to={{ pathname: `/search/${store.id}` }}>

  render() {
    return (
      <div className="Liked">
        <div id="liked" className="liked">♡</div>
      </div>
    );
  }
}

export default Liked;

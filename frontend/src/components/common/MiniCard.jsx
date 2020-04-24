import React from "react";
import "./MiniCard.scss";
import { withRouter } from "react-router-dom";

class MiniCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: {},
    };
  }

  componentDidMount() {
    this.setState({});
  }

  clickItem = () => {
    console.log(this.props.store.store_id);
    const { history } = this.props;
    history.push("/search/" + this.props.store.store_id);
    window.location.reload();
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <div className="MiniCard" onClick={this.clickItem}>
        <div id="square" className="bounceIn flipInY animated">
          <div className="thumbnail">
            <div className="centered">
              <img
                alt="food"
                className="img"
                src={this.props.store.store_img}
              />
            </div>
          </div>
        </div>
        {/* 가게 설명 */}
        <div className="explain">
          <div className="title">{this.props.store.store_name}</div>
          <div>{this.props.store.store_area}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(MiniCard);

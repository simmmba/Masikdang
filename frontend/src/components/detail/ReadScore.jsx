import React from "react";
import "./ReadScore.scss";

import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

class ReadScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: this.props.score,
    };
  }

  //<Link to={{ pathname: `/search/${store.id}` }}>

  render() {
    return (
      <div className="ReadScore" onClick={this.clickItem}>
        <div className="total_score">
          <Box mb={3} borderColor="transparent">
            <Rating name="read-only" precision={0.1} value={3.7} readOnly />
          </Box>
        </div>
      </div>
    );
  }
}

export default ReadScore;

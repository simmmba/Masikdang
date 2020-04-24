import React from "react";

import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import MiniCard from "../common/MiniCard";

class CarouselSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      similar: [],
    };
  }

  componentDidMount() {
    this.setState({
      similar: this.props.similar,
    });
  }

  // onChange = (e) => this.setState({ value: e.target ? e.target.value : e });
  render() {
    return (
      <div className="CarouselSlider">
        <Carousel
          slidesPerPage={5}
          slidesPerScroll={2}
          stopAutoPlayOnHover
          infinite
          centered={false}
          offset={5.5}
          breakpoints={{
            1000: {
              slidesPerPage: 4,
              clickToChange: false,
              centered: false,
            },
            500: {
              slidesPerPage: 2,
              slidesPerScroll: 2,
              // clickToChange: false,
              centered: false,
              animationSpeed: 2000,
            },
          }}
        >
          {this.state.similar.map((store, index) => (
            <MiniCard key={index} store={store}></MiniCard>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default CarouselSlider;

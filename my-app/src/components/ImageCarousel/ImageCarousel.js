// https://www.npmjs.com/package/react-responsive-carousel

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from "react-responsive-carousel";

class ImageCarousel extends Component {
    constructor(props) {
    super(props);
    this.state = {selectedFile: null};
  }

//  <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
  render() {
    return (
     <Carousel autoPlay>
    <div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGLyPhTIMEVSJMeK9Ldudt-hPIkaFFeCvm803Bh9PwKrL0ne5NaQ" />
      <p className="legend">Legend 1</p>
    </div>
    <div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpGh08TUUyTw6_jcbm8YeWBO7e45DXefbk6J5C-827EmWUlb-Ekw" />
      <p className="legend">Legend 2</p>
    </div>
  </Carousel>
    );
  }
}

export default ImageCarousel;



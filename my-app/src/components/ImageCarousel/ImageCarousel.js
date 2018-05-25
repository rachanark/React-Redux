// https://www.npmjs.com/package/react-responsive-carousel

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from "react-responsive-carousel";

class ImageCarousel extends Component {
    constructor(props) {
    super(props);
    this.state = {selectedFile: null};
  }
getCarousel(){
  console.log("xasd");
  console.log(this.props);
    return this.props.selectedImages.map((file)=>{
                          return (   <div>
        <img src={file} />
        <p className="legend">Legend 1</p>
        </div>
                     );
               
        });
}
//  <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
  render() {
    return (
     <Carousel>
       {this.getCarousel}
     </Carousel>
    );
  }
}

export default ImageCarousel;



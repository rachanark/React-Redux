// https://www.npmjs.com/package/react-responsive-carousel

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slider from "react-slick";
import '../../exStyle.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import { Carousel } from 'react-responsive-carousel';
//import { Carousel } from "react-responsive-carousel";

class ImageCarousel extends Component {
    constructor(props) {
    super(props);
   this.state = {selectedFile: null};
  }
getCarousel(){
    if(this.props.selectedImages.length>=1){
        debugger;
        return this.props.selectedImages.map((file)=>{
                          return (   <div>
                                        <img src={file} />
                                     </div>
                     );
               
        });
    }
    return "";
}
//  <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
  render() {
       
     let settings = { 
			//dots: true,
			className: 'caraousel'
		}
    if(this.props.selectedImages.length>=1)
		return (
            <div>
            /*<div>{this.getCarousel()}</div>*/
            <Slider {...settings} >
               /* {this.getCarousel()}
              <div><img src='http://placekitten.com/g/400/200' /></div>
				<div><img src='http://placekitten.com/g/400/200' /></div>
				<div><img src='http://placekitten.com/g/400/200' /></div>
                <div><img src='http://placekitten.com/g/400/200' /></div>
				<div><img src='http://placekitten.com/g/400/200' /></div>
				<div><img src='http://placekitten.com/g/400/200' /></div>*/
			</Slider>
            </div>
			    );
       else{
        return(
            <div>No images available</div>
        )
    }
      
  }
}

export default ImageCarousel;



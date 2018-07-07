import React, { Component } from 'react';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import axios,{ post } from 'axios';
import {UPLOAD_IMAGE} from '../../ApiConstants';

class ICarousel extends Component {
    constructor(props) {
    super(props);
   this.state = {selectedFile: null, curIndex: 0};
    this.navigatePrev = this.navigatePrev.bind(this);
    this.navigateNext = this.navigateNext.bind(this);
  }

  componentWillUpdate(nextProps,nextstates){
  	if(nextProps!=this.props){
	this.state.curIndex = 0;
  	this.setState(this.state);
  	}
  
  }
    
    getCarousel(){
    if(this.props && this.props.selectedImages && this.props.selectedImages.length>=1){
        debugger;
        return (
            <div style={{height: '220px', width: '350px'}}>
                <img style={{height: '100%', width: '100%'}} src={this.props.selectedImages[this.state.curIndex]} />
             </div>
        )
    }
    return null;
}
    navigatePrev() {
        debugger;
        if (this.state.curIndex === 0) {
            this.state.curIndex = this.props.selectedImages.length -1;
        } else {
            this.state.curIndex -= 1;
        }
        this.setState(this.state);
    }
       navigateNext() {
           debugger;
           if (this.state.curIndex === this.props.selectedImages.length -1) {
               this.state.curIndex = 0;
           } else {
            this.state.curIndex += 1;
           }
        this.setState(this.state);
       }

  render() {
    if (this.props.selectedImages.length>=1) {
    return (
      <div>
        {this.getCarousel()}
          <div>
            <button className="btn " onClick={this.navigatePrev}>PREV</button>
            <button className="btn " style={{marginLeft: '25px'}} onClick={this.navigateNext}>NEXT</button>
        </div>
      </div>
    );
  }
    return null;
  }

}


export default ICarousel;


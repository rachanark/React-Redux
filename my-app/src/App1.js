import React, { Component } from 'react';
import './App.css';
import CategoryList from './container/CategoryList';
import ShowSubCategory from './container/ShowSubCategory';
//import Store from "./index";

import ProductPage from './container/ProductPage';
import MasterPage from './container/MasterPage';
import NotFoundPage from './container/NotFoundPage';
import UploadImage from './components/UploadImage/UploadImage';
import ImageCarousel from './components/ImageCarousel/ImageCarousel';
import AddShelf from './components/AddShelf';
import AddColor from './components/AddColor';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import {connect} from 'react-redux';
import { Switch, Route } from 'react-router-dom';


class App1 extends Component {
  constructor(props) {
    super(props);
    this.state={style:[{name:'cat',style:{display:'none'}},{name:'pro',style:{display:'none'}},
    {name:'shelf',style:{display:'none'}}]
  };

    //this.handleClick = this.handleClick.bind(this);
  }
  handleClick(id){
      for(var i=0;i<3;i++){
        this.state.style[i].style={
          display:'none'
        }
      }
      this.state.style[id].style={
          display:'block'
        }
        this.setState( this.state);
       // console.log(event);

      //  alert("Clicked"+id);

  }
  
  render() {
        var stylefordiv = {
                            backgroundColor: 'pink',
                            overflow:'auto'
                          };
          var style={
            width:200,
            height:200,
            border:2,
            float:'left'
          }
          var s2={
            float:'left',
            display:'flex'
          }
    return (
        <div  className="App">
              <div style={stylefordiv}>
              <button type="button" onClick={this.handleClick.bind(this,'0')}>ADD-Category</button>
              <button type="button" onClick={this.handleClick.bind(this, 1)}>ADD-Product</button>
              <button type="button" onClick={this.handleClick.bind(this, 2)}>ADD-Shelf-Color</button>
              </div>
              <div>
                    <div style={ this.state.style[0].style} ref='category'>
                      
                        <div style={s2}>
                          <ShowSubCategory style={s2} /> 
                        </div>
                   </div>
                   <div style={this.state.style[1].style} id='Product'>
                     < ProductPage/>
                  </div>
                  <div style={this.state.style[2].style} id='shelf'>
                      <AddShelf/>
                      <AddColor/>
                  </div>
              </div>
      </div>
    );
  }

}

export default App1;
 /* <div style={s2}>
        Below added componenets are just for testing. Use them as required!
        <hr />
        <hr />
          <UploadImage />
        <hr />
        <hr />
          <ImageCarousel />
        <hr />
        <hr />
        </div>*/

        /*
  <div  className="App">
              <div style={stylefordiv}>
              <button type="button" onclick={this.handleClick(0)}>ADD-Category</button>
              <button type="button" onclick={this.handleClick(1)}>ADD-Product</button>
              <button type="button" onclick={this.handleClick(2)}>ADD-Shelf-Color</button>
              </div>
              <div>
                    <div style={ this.state.style[0].style} ref='category'>
                         <div style={style}>
                          <CategoryList name="Sara" />
                        </div>
                        <hr />
                        <div style={s2}>
                          <ShowSubCategory style={s2} /> 
                        </div>
                   </div>
                   <div style={this.state.style[1].style} id='Product'>
                      Product Page
                  </div>
                  <div style={this.state.style[2].style} id='shelf'>
                      <AddShelf/>
                      <AddColor/>
                  </div>
              </div>
      </div>


        */
           /*<div style={style}>
                          <CategoryList name="Sara" />
                        </div>*/
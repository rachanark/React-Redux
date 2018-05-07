import React, { Component } from 'react';
import './App.css';
import CategoryList from './container/CategoryList';
import SubCategoryList from './container/SubCategoryList';


import ProductPage from './container/ProductPage';
import MasterPage from './container/MasterPage';
import NotFoundPage from './container/NotFoundPage';
import UploadImage from './components/UploadImage/UploadImage';
import ImageCarousel from './components/ImageCarousel/ImageCarousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';


import { Switch, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Add category</h2>
          <CategoryList name="Sara" />
        <hr />
        <h2>Add Product
        </h2>
         <SubCategoryList />


        <hr />
        <hr />
        <hr />
        <hr />
        Below added componenets are just for testing. Use them as required!
        <hr />
        <hr />
        <hr />
        <hr />
          <UploadImage />
        <hr />
        <hr />
          <ImageCarousel />
        <hr />
        <hr />
      </div>
    );
  }
}

export default App;

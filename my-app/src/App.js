import React, { Component } from 'react';
import './App.css';
import CategoryList from './container/CategoryList'
import SubCategoryList from './container/SubCategoryList'

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
      </div>
    );
  }
}

export default App;

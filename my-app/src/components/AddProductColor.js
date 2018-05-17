import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addNewCategory} from '../action';

class AddProductColor extends Component {
    constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    var newCat=this.state.value;
    addNewCategory(newCat,this.props.Category);
    event.preventDefault();
  }

  render() {
    var buttonStyle={
      width:25,
      height:25
    };
    var FieldStyle={
     width:80,
     height:20
    };
    return (
      <div>
          Shelf: <input type="text" style={FieldStyle} value={this.state.value} onChange={this.handleChange} />
          Quantity: <input type="text" style={FieldStyle} value={this.state.value} onChange={this.handleChange} />
          Size: <input type="text" style={FieldStyle} value={this.state.value} onChange={this.handleChange} />
          <input type="submit" style={buttonStyle} value="+"  /><br/>
          
      </div>
    );
  }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({addNewCategory: addNewCategory}, dispatch);
}

function mapStateToProps(state) {
    return {
       Category: state.Category,
        selectedCategory:state.selectedCategory,
        Track:state.Track
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(AddProductColor);
import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addNewShelf} from '../action';

class AddShelf extends Component {
    constructor(props) {
    super(props);
    console.log("Initial state of Shelf")
    console.log(this.state);
    this.state = {value: ''};
     console.log(this.state);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log("Adding Shelf"+this.state.value);
    this.props.addNewShelf(this.state.value);
   //  this.props.selectSubCategory(category,this.props.Track);
    event.preventDefault();
  }

  render() {
    var buttonStyle={
      width:20,
      height:20
    };
    var FieldStyle={
     width:80,
     height:20
    };
    return (

          <div>
          Shelf:
          <input type="text" style={FieldStyle} value={this.state.value}  onChange={this.handleChange} />
          <input type="submit" style={buttonStyle} value="+" onClick={() => { 
                                          if(this.state.value!=""){
                                             this.setState({value:""});
                                             this.props.addNewShelf(this.state.value,this.props.Track,this.props.Category);
                                          }
                                         
                                        }
                        } />
        </div>
  
    );
  }
}
//
function mapStateToProps(state){
 // console.log(this.state);
    return {
           Track:state.Track,
           Category:state.Category
    }; 
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({addNewShelf: addNewShelf}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddShelf);
/*
onClick={() => {    
                                           this.props.addNewShelf(this.state.value);
                                        }
                        }
*/
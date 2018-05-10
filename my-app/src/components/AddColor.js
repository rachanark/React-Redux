import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addNewColor} from '../action';

class AddColor extends Component {
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
      //  addNewColor(this.state.value);
   // alert('Successfully Added: ' + this.state.value);
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
          Color:
          <input type="text" style={FieldStyle} value={this.state.value} onChange={this.handleChange} />
        <input type="submit" style={buttonStyle} value="+" onClick={() => {  
                                          if(this.state.value!=""){
                                            this.setState({value:""});  
                                           this.props.addNewColor(this.state.value,this.props.Track,this.props.Category);
                                          }
                                          
                                        }
                        } />
      </div>
    );
  }
}
function mapStateToProps(state){
 // console.log(this.state);
    return {
           Track:state.Track,
           Category:state.Category
    }; 
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({addNewColor: addNewColor}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AddColor);
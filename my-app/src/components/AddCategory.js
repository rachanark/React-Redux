import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addNewCategory} from '../action';

class AddCategory extends Component {
    constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    var buttonStyle={
      width:25,
      height:25
    };
    var FieldStyle={
     width:100,
     height:20
    };
    return (
      <div>
          <input type="text" style={FieldStyle} value={this.state.value} onChange={this.handleChange} />
        <input type="submit" style={buttonStyle} value="+"  onClick={() => { 
                                            if(this.state.value!="") {
                                              this.setState({value:""});
                                              this.props.addNewCategory(this.state.value,this.props.categoryVal,this.props.Category,this.props.Track);
                                            }  
                                           
                                        }
                        } />
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

export default connect(mapStateToProps, matchDispatchToProps)(AddCategory);
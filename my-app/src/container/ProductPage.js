import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddProductColor from '../components/AddProductColor'

class ProductPage extends Component {
 constructor(props) {
    super(props);
    this.state = {value: '',colorstyle:{
    	display:'none'
    }};

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleClick(event) {
   this.state.colorstyle={
    	display:'block'
    };
    this.setState( this.state);
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
	            <div>
	               Description:
	                <input type="text" value={this.state.value} onChange={this.handleChange} />
	                <br/>
	             </div>
	             <div>
	                Color:
	                <input type="submit" style={buttonStyle} value="+" onClick={this.handleClick} />
	                <div style={this.state.colorstyle}>
	                <AddProductColor/>
	                <input type="submit" value="SAVE"  />
	                </div>
	            </div>
            </div>
        );
    }

}


export default ProductPage;

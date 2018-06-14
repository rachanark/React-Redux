/*import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {OnLoad} from '../action'

class LoadComponent extends Component{

	render(){
		console.log("LoadComponent");
		console.log(this.props.value);
    	OnLoad(this.props.value);	
    	return 1;
     }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({OnLoad: OnLoad}, dispatch);
}
export default connect(matchDispatchToProps)(LoadComponent);*/
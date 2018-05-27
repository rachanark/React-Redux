import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addNewColor,OnLoadMaster} from '../action';
import axios from 'axios';

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
      event.preventDefault();
  }
  showColors(){
    if(this.props.MasterDataReducer!=null){
       return this.props.MasterDataReducer.color.map((masterColor)=>{
          return <li>{masterColor.color}</li>
        });
    }
    else
      return "";
  }

  render() {
   if(this.props.MasterDataReducer!=null){
      return (
      <div className="form-group container">
          Color:
          <div style={{  width:80,height:20,display:'inline-block',margin:10}}>
          <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
          </div>
          <input className="btn" type="submit" value="+" onClick={() => {  
                                          if(this.state.value!=""){
                                            this.setState({value:""});  
                                           this.props.addNewColor(this.state.value,this.props.Track,this.props.Category,
                                           this.props.MasterDataReducer);
                                          }
                                          
                                        }
                        } />
          <br/>
          <ul>{this.showColors()}</ul>
      </div>
    );
   }
   else{
          axios.get('https://acinventory-204612.appspot.com/rest/getMasterData').then(res =>{
            console.log("Response Master");
            console.log(res.data);
           this.props.OnLoadMaster(this.props.Category,this.props.Track,res.data);
         });
        return "";
      }
    
  }
}
function mapStateToProps(state){
 // console.log(this.state);
    return {
           Track:state.Track,
           Category:state.Category,
           MasterDataReducer:state.MasterDataReducer
    }; 
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({addNewColor: addNewColor,OnLoadMaster:OnLoadMaster}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AddColor);
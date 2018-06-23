import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addNewColor,OnLoadMaster} from '../action';
import axios from 'axios';
import {SAVE_MASTER_DATA,GET_MASTER_DATA} from '../ApiConstants'
import ColorButton from './ColorButton';

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
          return <tr>
          <td><ColorButton colorval={masterColor}/></td>
          </tr>
        });
    }
    else
      return ""; 
  }
addNewColor(value,master){
var value=value;
var master=master;
           var obj={color:[{color:value}],shelf:[]}
           axios.post(SAVE_MASTER_DATA,obj).then(res =>{
                    master.color.push({colorId:res.data.colorId,color:value});
                    this.props.addNewColor(this.props.Category,this.props.Track,master);
                }).catch(function (error) {
                    console.log(error);
                  });
}
  render() {
   if(this.props.MasterDataReducer!=null){
      return (
        <center>
      <div className="form-group container">
          Colour:
          <div style={{  width:80,height:20,display:'inline-block',margin:10}}>
          <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
          </div>
          <input className="btn" type="submit" value="+" onClick={() => {  
                                          if(this.state.value!=""){
                                            this.setState({value:""});  
                                           this.addNewColor(this.state.value,
                                           this.props.MasterDataReducer);
                                          }
                                          
                                        }
                        } />
          <br/>
          <h3 style={{margin:'35px 0'}}>Colors</h3>
          <table className="table table-bordered" style={{width:'25%'}}><tbody>{this.showColors()}</tbody></table>
      </div>
      </center>
    );
   }
   else{
          axios.get(GET_MASTER_DATA).then(res =>{
            this.props.OnLoadMaster(this.props.Category,this.props.Track,res.data);
         }).catch(function (error) {
              console.log(error);
            });
        return "";
      }
    
  }
}
function mapStateToProps(state){
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
import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addNewSize,OnLoadMaster} from '../action';
import axios from 'axios';
import {SAVE_MASTER_DATA,GET_MASTER_DATA} from '../ApiConstants';

class AddSize extends Component {
    constructor(props) {
    super(props);
    console.log("Initial state of Size")
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
    console.log("Adding Size"+this.state.value);
    this.props.addNewSize(this.state.value);
   //  this.props.selectSubCategory(category,this.props.Track);
    event.preventDefault();
  }
  showSizes(){
    if(this.props.MasterDataReducer!=null){
       return this.props.MasterDataReducer.size.map((masterSize)=>{
          return <tr><td>{masterSize.size}</td></tr>
        });
    }
    else
      return "";
  }
addNewSize(value,master){
var value=value;
var master=master;
            console.log("Added size"+value);
            var obj={size:[{size:value}],color:[],shelf:[]}
           axios.post(SAVE_MASTER_DATA,obj).then(res =>{
                    console.log("Added Successfully");
                    master.size.push({sizeId:res.data.shelfId,size:value});
                    this.props.addNewSize(this.props.Category,this.props.Track,master);
                }).catch(function (error) {
                    console.log(error);
                  });
}

  render() {
    if(this.props.MasterDataReducer!=null){
    return (
        <center>
          <div className="form-group container">
          Size:
          <div style={{  width:80,height:20,display:'inline-block',margin:10}}>
          <input className="form-control" type="text"  value={this.state.value}  onChange={this.handleChange} />
          </div>
          <input className="btn" type="submit" value="+" onClick={() => { 
                                          if(this.state.value!=""){
                                             this.setState({value:""});
                                             this.addNewSize(this.state.value,
                                             this.props.MasterDataReducer);
                                          }
                                         
                                        }
                        } />
           <br/>
          <h3 style={{margin:'35px 0'}}>Sizes</h3>
          <table className="table table-bordered" style={{width:'25%'}}><tbody>{this.showSizes()}</tbody></table>
        </div>
        </center>
    );
  }
  else{
     axios.get(GET_MASTER_DATA).then(res =>{
            console.log("Response Master");
            console.log(res.data);
           this.props.OnLoadMaster(this.props.Category,this.props.Track,res.data);
         });
      return "";
  }
  }
}
//
function mapStateToProps(state){
 // console.log(this.state);
    return {
           Track:state.Track,
           Category:state.Category,
            MasterDataReducer:state.MasterDataReducer
    }; 
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({addNewSize: addNewSize,OnLoadMaster:OnLoadMaster}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddSize);
/*
onClick={() => {    
                                           this.props.addNewShelf(this.state.value);
                                        }
                        }
*/
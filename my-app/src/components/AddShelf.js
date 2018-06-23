import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addNewShelf,OnLoadMaster} from '../action';
import axios from 'axios';
import {SAVE_MASTER_DATA,GET_MASTER_DATA} from '../ApiConstants';
import ShelfButton from './ShelfButton';

class AddShelf extends Component {
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
    this.props.addNewShelf(this.state.value);
    event.preventDefault();
  }
  showShelves(){
    if(this.props.MasterDataReducer!=null){
       return this.props.MasterDataReducer.shelf.map((masterShelf)=>{
          return <tr><td><ShelfButton shelfval={masterShelf}/></td></tr>
        });
    }
    else
      return "";
  }
addNewShelf(value,master){
var value=value;
var master=master;
            var obj={shelf:[{shelfLocation:value}],color:[]}
           axios.post(SAVE_MASTER_DATA,obj).then(res =>{
                    master.shelf.push({shelfId:res.data.shelfId,shelfLocation:value});
                    this.props.addNewShelf(this.props.Category,this.props.Track,master);
                }).catch(function (error) {
                    console.log(error);
                  });
}

  render() {
    if(this.props.MasterDataReducer!=null){
    return (<center>
          <div className="form-group container">
          Shelf:
          <div style={{  width:80,height:20,display:'inline-block',margin:10}}>
          <input className="form-control" type="text"  value={this.state.value}  onChange={this.handleChange} />
          </div>
          <input className="btn" type="submit" value="+" onClick={() => { 
                                          if(this.state.value!=""){
                                             this.setState({value:""});
                                             this.addNewShelf(this.state.value,
                                             this.props.MasterDataReducer);
                                          }
                                         
                                        }
                        } />
           <br/>
           <h3 style={{margin:'35px 0'}}>Shelves</h3>
          <table className="table table-bordered" style={{width:'25%'}}><tbody>{this.showShelves()}</tbody></table>
        </div>
        </center>
    );
  }
  else{
     axios.get(GET_MASTER_DATA).then(res =>{
           this.props.OnLoadMaster(this.props.Category,this.props.Track,res.data);
         });
      return "";
  }
  }
}
//
function mapStateToProps(state){
    return {
           Track:state.Track,
           Category:state.Category,
            MasterDataReducer:state.MasterDataReducer
    }; 
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({addNewShelf: addNewShelf,OnLoadMaster:OnLoadMaster}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddShelf);
/*
onClick={() => {    
                                           this.props.addNewShelf(this.state.value);
                                        }
                        }
*/
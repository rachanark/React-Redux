import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addNewShelf,OnLoadMaster} from '../action';
import axios from 'axios';

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
  showShelves(){
    if(this.props.MasterDataReducer!=null){
       return this.props.MasterDataReducer.shelf.map((masterColor)=>{
          return <li>{masterColor.shelfLocation}</li>
        });
    }
    else
      return "";
  }


  render() {
    if(this.props.MasterDataReducer!=null){
    return (

          <div className="form-group container">
          Shelf:
          <div style={{  width:80,height:20,display:'inline-block',margin:10}}>
          <input className="form-control" type="text"  value={this.state.value}  onChange={this.handleChange} />
          </div>
          <input className="btn" type="submit" value="+" onClick={() => { 
                                          if(this.state.value!=""){
                                             this.setState({value:""});
                                             this.props.addNewShelf(this.state.value,this.props.Track,this.props.Category,
                                             this.props.MasterDataReducer);
                                          }
                                         
                                        }
                        } />
           <br/>
          <ul>{this.showShelves()}</ul>
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
    return bindActionCreators({addNewShelf: addNewShelf,OnLoadMaster:OnLoadMaster}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddShelf);
/*
onClick={() => {    
                                           this.props.addNewShelf(this.state.value);
                                        }
                        }
*/
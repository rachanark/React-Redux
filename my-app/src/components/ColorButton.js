import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {OnLoadMaster} from '../action';
import axios from 'axios';
import {EDIT_COLOR,GET_MASTER_DATA} from '../ApiConstants';

class ColorButton extends Component {
    constructor(props) {
    super(props);
    this.state = {value:this.props.colorval.color,style:{styleEdit:{display:'none'},styleSpan:{display:'block'}}};

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.handleEdit=this.handleEdit.bind(this)
  }

  handleChange(event) {
    this.state.value= event.target.value;
    this.setState( this.state);
  }
  keyPress(e){
      if(e.keyCode == 13){
         this.state.style.styleEdit={display:'none'};
         this.state.style.styleSpan={display:'block'};
         this.setState( this.state);
        this.editColor(this.state.value,this.props.value);
      }
   }
editColor(newvalue,color){
             var x={
              id:color.colorId,
              name:newvalue
            }
            axios.post(EDIT_COLOR,x).then(res =>{
                axios.get(GET_MASTER_DATA).then(res =>{
                           this.props.OnLoadMaster(this.props.Category,this.props.Track,res.data);
                     }).catch(function (error) {
                          console.log(error);
                      });

                }).catch(function (error) {
                  alert("Unable to edit");
                    console.log(error);
                  });
}
  handleCancel(){
     this.state.style.styleEdit={display:'none'};
     this.state.style.styleSpan={display:'block'};
     this.setState( this.state);
   }

   handleEdit(){
    this.state.style.styleEdit={display:'block'};
    this.state.style.styleSpan={display:'none'};
    this.setState( this.state);
   }

  render() {
    var colorval=this.props.colorval;
    return (
   <div>
        <div style={this.state.style.styleEdit}>
        <div  style={{  width:80,height:20,display:'inline-block',marginBottom:'10px'}}>
        <input className="form-control form-control-sm" type="text" value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange} />
         </div>
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Azzfiyd3n-VTnU7pOn-85Q-UAeUU4d-fmK9l7_-dl4XIBS_E" 
         style={{width:20,height:20}}  onClick={()=>this.handleCancel()} />
         </div>   
          <div style={this.state.style.styleSpan}>
          <table>
          <tbody>
          <tr>
              <td style={{width:'172px'}}>
                    {colorval.color}


                </td>
                <td>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRglrs6ulIyp_Qlt6Ecnf2dk-gm36hqZP_f7L1ygABEGUE1zjLqhQ" style={{width:20,height:20}}
                        onClick={()=>this.handleEdit()}
                      />
                </td>
           </tr>
          </tbody>
          </table>
            </div>
      </div>
    );
  }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({OnLoadMaster: OnLoadMaster}, dispatch);
}

function mapStateToProps(state) {
    return {
         Category: state.Category,
        selectedCategory:state.selectedCategory,
        Track:state.Track,
        MasterDataReducer:state.MasterDataReducer
    };
}

export default connect(mapStateToProps,matchDispatchToProps)(ColorButton);
import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectSubCategory,selectCategory,editCategory,removeCategory} from '../action';

class CategoryButton extends Component {
    constructor(props) {
    super(props);
    this.state = {value: this.props.value.name,style:{styleEdit:{display:'none'},styleSpan:{display:'block'}}};

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
         console.log("edited");
         console.log(this.state.value);
        this.props.editCategory(this.props.Category,this.props.Track,this.state.value,this.props.value,this.props.MasterDataReducer);
      }
   }
   handleEdit(){
    console.log("edit");
    this.state.style.styleEdit={display:'block'};
    this.state.style.styleSpan={display:'none'};
    this.setState( this.state);
   // this.props.editCategory(this.props.Category,this.props.Track,this.state.value,this.props.value);
   }

   handleCancel(){
      this.state.style.styleEdit={display:'none'};
     this.state.style.styleSpan={display:'block'};
      this.setState( this.state);
   }
  render() {
    var category=this.props.value;
    return (
   <div>
        <div style={this.state.style.styleEdit}>
        <div  style={{  width:80,height:20,display:'inline-block',margin:10}}>
        <input className="form-control form-control-sm" type="text" value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange} />
         </div>
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Azzfiyd3n-VTnU7pOn-85Q-UAeUU4d-fmK9l7_-dl4XIBS_E" 
         style={{width:20,height:20}}  onClick={()=>this.handleCancel()} />
         </div>   
          <div style={this.state.style.styleSpan}>
          <table>
          <tbody>
          <tr>
              <td  onClick={  () => {     this.props.selectCategory(category,this.props.Track,this.props.Category);
                                          //  this.props.selectSubCategory(category,this.props.Track,this.props.Category);
                                      }
                                }>
                    <u>{category.name}</u>


                </td>
                <td>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Azzfiyd3n-VTnU7pOn-85Q-UAeUU4d-fmK9l7_-dl4XIBS_E" 
                      style={{width:20,height:20}}  onClick={()=>this.props.removeCategory(this.props.Category,category,this.props.Track,this.props.MasterDataReducer)} />
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
    return bindActionCreators({selectCategory: selectCategory,selectSubCategory:selectSubCategory,
      removeCategory:removeCategory,editCategory:editCategory}, dispatch);
}

function mapStateToProps(state) {
    return {
       Category: state.Category,
        selectedCategory:state.selectedCategory,
        Track:state.Track,
        MasterDataReducer:state.MasterDataReducer
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(CategoryButton);
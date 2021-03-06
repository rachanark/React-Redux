import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectSubCategory,selectCategory,editCategory,removeCategory} from '../action';
import axios from 'axios';
import {REMOVE_CATEGORY,EDIT_CATEGORY} from '../ApiConstants';

class CategoryButton extends Component {
    constructor(props) {
    super(props);
    this.state = {value: this.props.value.categoryName,style:{styleEdit:{display:'none'},styleSpan:{display:'block'}}};

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
        this.editCategory(this.props.Category,this.props.Track,this.state.value,this.props.value,this.props.MasterDataReducer);
      }
   }
editCategory(main,Track,value,category,master){
  var editCat=category;
            var editval=value;
            var loops=editCat.levelId.split('-');
            loops.splice(0,1);
            var mainCategory=main;
            var temp=mainCategory.subcategory;
            for(var i=0;i<loops.length-1;i++){
                temp=temp[parseInt(loops[i])-1].subcategory;
            }
            
            var x={
              title:editval,
              categoryId:temp[parseInt(loops[loops.length-1])-1].categoryId,
              decription:"",
              parentId:1
            }
            axios.post(EDIT_CATEGORY,x).then(res =>{
                    temp[parseInt(loops[loops.length-1])-1].categoryName=editval;
                    this.props.editCategory(JSON.parse(JSON.stringify(mainCategory)),this.props.Track,this.props.MasterDataReducer);
                }).catch(function (error) {
                  alert("Unable to edit");
                    console.log(error);
                  });
}


   handleEdit(){
    this.state.style.styleEdit={display:'block'};
    this.state.style.styleSpan={display:'none'};
    this.setState( this.state);
   }
formatCategory(category){
    var subcat=category.subcategory;
        for(var i=0;i<subcat.length;i++){
            subcat[i].levelId=category.levelId+"-"+(i+1);
            if(subcat[i].subcategory.length==0)
                continue;
            else
                this.formatCategory(subcat[i])
        }
}
removeCategory(main,category,Track,master){
  var removeCat=category;
  var loops=removeCat.levelId.split('-');
  var obj={};
  var mainCategory=main;
  var temp=mainCategory.subcategory;//l2
  for(var i=1;i<loops.length-1;i++){
                  temp=temp[parseInt(loops[i])-1].subcategory;
              }
  var catId=temp[parseInt(loops[loops.length-1])-1].categoryId;
  
  axios.delete(REMOVE_CATEGORY+"/"+catId).then(res =>{
           temp.splice(parseInt(loops[loops.length-1])-1,1);
           obj=JSON.parse(JSON.stringify(mainCategory));
          this.formatCategory(obj);
          this.props.removeCategory(obj,this.props.Track,this.props.MasterDataReducer);
      }).catch(function (error) {
          console.log(error);
        });
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
              <td style={{cursor:'pointer',width:'172px'}} onClick={  () => {     this.props.selectCategory(category,this.props.Track,this.props.Category,this.props.MasterDataReducer);
            
                                      }
                                }>
                    {category.categoryName}


                </td>
                <td>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRglrs6ulIyp_Qlt6Ecnf2dk-gm36hqZP_f7L1ygABEGUE1zjLqhQ" style={{width:20,height:20}}
                        onClick={()=>this.handleEdit()}
                      />
                </td>
                <td>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Azzfiyd3n-VTnU7pOn-85Q-UAeUU4d-fmK9l7_-dl4XIBS_E" 
                      style={{width:20,height:20}}  onClick={()=>this.removeCategory(this.props.Category,category,this.props.Track,this.props.MasterDataReducer)} />
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
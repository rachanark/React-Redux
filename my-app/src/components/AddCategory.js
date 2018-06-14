import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addNewCategory} from '../action';
import axios from 'axios';
import {CREATE_CATEGORY} from '../ApiConstants';
class AddCategory extends Component {
    constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  addNewCategory(newCategory,categaoryValue,Category,Track,master){
    var categaoryValue=categaoryValue;
          var newCategory=newCategory;
          var mainCategory=Category;
          var loops=categaoryValue.levelId.split('-');
          var len;
          if(mainCategory.subcategory!=null)
            len=mainCategory.subcategory.length+1;
          else
            len=1;
              if(loops.length==1){
                        var newCat={
                            categoryName:newCategory,
                            levelId:mainCategory.levelId+"-"+len,
                            subcategory:[]
                            };
                            var reqObj={
                              title:newCategory,
                              description:"",
                              parentId:0
                            }
                           // mainCategory.subcategory.push(newCat);
                    axios.post(CREATE_CATEGORY,reqObj).then(res =>{
                    console.log(res);
                    newCat.id=res.categoryId;
                    mainCategory.subcategory.push(newCat);
                    this.props.addNewCategory(JSON.stringify(JSON.parse(mainCategory)),this.props.Track,this.props.MasterDataReducer)
                }).catch(function (error) {
                      alert("Unable to add Category")
                      console.log(error);
                    });   
              }
              else{
                var temp=mainCategory;
                for(var i=1;i<loops.length;i++){
                  temp=temp.subcategory[parseInt(loops[i])-1];
                }
                   var len;
                    if(temp.subcategory!=null)
                      len=temp.subcategory.length+1;
                    else
                      len=1;
                        var newCat={
                            categoryName:newCategory,
                            levelId:temp.levelId+"-"+len,
                            subcategory:[]
                        };
                         var reqObj={
                              title:newCategory,
                              description:"",
                              parentId:temp.categoryId
                            }
                        temp.subcategory.push(newCat);
                        axios.post(CREATE_CATEGORY,reqObj).then(res =>{
                            console.log("Added Successfully");
                             this.props.addNewCategory(mainCategory,this.props.Track,this.props.MasterDataReducer)
                        }).catch(function (error) {
                                console.log(error);
                              }); 
                
              }
  }

  render() {
  
    return (
      <div>
      <div style={{ display:'inline-block',margin:10}}>
        <input className="form-control form-control-sm " type="text" value={this.state.value} onChange={this.handleChange} />
        </div>
        <input className="btn" type="submit" value="+"  onClick={() => { 
                                            if(this.state.value!="") {
                                              this.setState({value:""});
                                              this.addNewCategory(this.state.value,this.props.categoryVal,
                                              this.props.Category,this.props.Track,this.props.MasterDataReducer);
                                            }  
                                           
                                        }
                        } />
      </div>
    );
  }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({addNewCategory: addNewCategory}, dispatch);
}

function mapStateToProps(state) {
    return {
        Category: state.Category,
        selectedCategory:state.selectedCategory,
        Track:state.Track,
        MasterDataReducer:state.MasterDataReducer
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(AddCategory);

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectSubCategory,selectCategory,OnLoad} from '../action';
import AddCategory from '../components/AddCategory';
import CategoryButton from '../components/CategoryButton';
import {GET_CATEGORY_TREE} from '../ApiConstants';
import axios from 'axios';

class SubCategoryList extends Component {


    showList(){
      if(this.props.catval.subcategory!=null)
        return this.props.catval.subcategory.map((category)=>{
                       return (   <li key={category.name}>
                              <CategoryButton value={category}/>
                    </li> 
                     );
               
        });
        else
          return "";
    }

      render() {
        var style={
                border:2,
                padding:0,
                //float:'left',
                listStyleType:'none'
              };
       
              var divstyle={
                display:'inline',
                backgroundColor:'black',
              }
    if(this.props.catval!=null){
        return (
            <div style={divstyle}>
            <AddCategory categoryVal={this.props.catval}/>
            <ul style={style}>
                {this.showList()}
            </ul>
            </div>
        );
      }
      else{
          axios.get(GET_CATEGORY_TREE).then(res =>{
            console.log("Response");
            console.log(res.data);
            var x= {   name:'main',
                        levelId:'1',
                        subcategory:res.data 
                    };
           this.props.OnLoad(x,['1'],this.props.MasterDataReducer);
         }).catch(function (error) {
    console.log(error);
  });;
        return "";
      }
        
    }

}

function mapStateToProps(state) {
      console.log("Track");
        console.log(state.Track);
    return {
       Category: state.Category,
        selectedCategory:state.selectedCategory,
        Track:state.Track,
        MasterDataReducer:state.MasterDataReducer
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({selectSubCategory: selectSubCategory,selectCategory: selectCategory,OnLoad:OnLoad}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(SubCategoryList);

/*
<input type="submit" style={{height:10,width:10}} value="X"/>
*/
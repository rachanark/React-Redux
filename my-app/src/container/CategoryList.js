import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectCategory,selectSubCategory,OnLoad} from '../action';
import AddCategory from '../components/AddCategory'
import axios from 'axios';
class CategoryList extends Component {
 
    showList(){
        console.log( "this.props.Category");
         console.log( this.props.Category);
        return this.props.Category.subcategory.map((category)=>{
            return (
                    <li  key={category.id}
                        onClick={() => {    this.props.selectCategory(category,this.props.Track,this.props.Category);
                                          //   this.props.selectSubCategory(category,this.props.Track,this.props.Category);
                                        }
                        }
                    >{category.name}</li>
                );
        });
    }
        getInit(){
            var self = this;
            axios.get('http://localhost:9090/Dummy')
          .then(function (response) {
           self.props.OnLoad(response.data,self.props.Track);
          })
          .catch(function (error) {
            console.log(error);
          });
        }

    render() {
        if(JSON.stringify(this.props.Category).length<=2){
            this.getInit();
        }
         var style={
                width:100,
                height:100,
                border:2,
                float:'left'
              };
        return (
            <div>
            <AddCategory categoryVal={this.props.Category}/>
            <ul style={style}>
                {this.showList()}
            </ul>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        Category: state.Category,
        selectedCategory:state.selectedCategory,
        Track:state.Track
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({selectCategory: selectCategory,selectSubCategory:selectSubCategory,OnLoad:OnLoad}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(CategoryList);
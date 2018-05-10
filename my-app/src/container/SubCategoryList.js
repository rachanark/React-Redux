import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectSubCategory,selectCategory} from '../action';
import AddCategory from '../components/AddCategory'

class SubCategoryList extends Component {


    showList(){
        return this.props.catval.subcategory.map((category)=>{
            
                    if(category.subcategory!=null){
                          return (   <li key={category.id}
                        onClick={  () => {    this.props.selectCategory(category,this.props.Track,this.props.Category);
                                              this.props.selectSubCategory(category,this.props.Track,this.props.Category);
                                        }

                                }
                    >{category.name}</li> 
                     );
                    }
              
                    else{
                       return (   <li key={category.id}
                    >{category.name}</li>
                    );
                    }
               
        });
    }

      render() {

           if (!this.props.selectedCategory) {
            return (<div></div>);
             }
         var style={
                width:100,
                height:100,
                border:2,
                float:'left'
              };
              var divstyle={
                display:'inline'
              }
        return (
            <div stle={divstyle}>
            <AddCategory categoryVal={this.props.catval.subcategory}/>
            <ul style={style}>
                {this.showList()}
            </ul>
            </div>
        );
    }

}

function mapStateToProps(state) {
      console.log("Track");
        console.log(state.Track);
    return {
       Category: state.Category,
        selectedCategory:state.selectedCategory,
        Track:state.Track
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({selectSubCategory: selectSubCategory,selectCategory: selectCategory}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(SubCategoryList);
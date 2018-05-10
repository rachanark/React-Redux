import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectCategory,selectSubCategory} from '../action';
import AddCategory from '../components/AddCategory'

class CategoryList extends Component {
 
    showList(){
        var style={float:'left'}
        console.log( "his.props.Category");
         console.log( this.props.Category);
        return this.props.Category.map((category)=>{
            return (
                    <li style={style} key={category.id}
                        onClick={() => {    this.props.selectCategory(category,this.props.Track,this.props.Category);
                                             this.props.selectSubCategory(category,this.props.Track,this.props.Category);
                                        }
                        }
                    >{category.name}</li>
                );
        });
    }

    render() {
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
    return bindActionCreators({selectCategory: selectCategory,selectSubCategory:selectSubCategory}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(CategoryList);
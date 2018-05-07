import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectSubCategory} from '../action';

class SubCategoryList extends Component {

    showList(){
        return this.props.selectedCategory.map((category)=>{
            return (
                    <li key={category.id}
                        onClick={() => this.props.selectSubCategory(category)}
                    >{category.name}</li>
                );
        });
    }
    
    render() {

           if (!this.props.selectedCategory) {
            return (<div>Select a subCategory...</div>);
        }
        return (
            <ul>
                {this.showList()}
            </ul>
        );
    }

}

function mapStateToProps(state) {
    return {
        selectedCategory:state.selectedCategory
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({selectSubCategory: selectSubCategory}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(SubCategoryList);
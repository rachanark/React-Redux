import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectCategory} from '../action';

class CategoryList extends Component {

    showList(){
        console.log(this.props.name);
        return this.props.Categories.map((category)=>{
            return (
                    <li key={category.id}
                        onClick={() => this.props.selectCategory(category.subcategory)}
                    >{category.name}</li>
                );
        });
    }

    render() {
        return (
            <ul>
                {this.showList()}
            </ul>
        );
    }

}

function mapStateToProps(state) {
    return {
        Categories: state.categories,
        selectedCategory:state.selectedCategory
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({selectCategory: selectCategory}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(CategoryList);
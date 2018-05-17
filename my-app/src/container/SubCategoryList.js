import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectSubCategory,selectCategory} from '../action';
import AddCategory from '../components/AddCategory';
import CategoryButton from '../components/CategoryButton';
class SubCategoryList extends Component {


    showList(){
        return this.props.catval.subcategory.map((category)=>{
              var style={padding:1,backgroundColor:'#DCDCDC',border:1,borderStyle: 'inset'};
                          return (   <li key={category.name}>
                              <CategoryButton value={category}/>
                    </li> 
                     );
               
        });
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
                backgroundColor: 'pink',
                //margin:10
               // backgroundColor:'#f1f1f1'
              }
        return (
            <div stle={divstyle}>
            <AddCategory categoryVal={this.props.catval}/>
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

/*
<input type="submit" style={{height:10,width:10}} value="X"/>
*/
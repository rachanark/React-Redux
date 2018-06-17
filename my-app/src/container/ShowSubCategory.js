import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SubCategoryList from './SubCategoryList'
import {addNewCategory} from '../action';

class ShowSubCategoryList extends Component {
	    showDivs(){
	        var Track=this.props.Track;
	         if(Track.length>1){
	            var loops=Track[Track.length-1].split("-");
	            var cat=this.props.Category;
	            var style={
	                float:'left',
	                padding:10,
	                marginLeft:'10px',
	                backgroundColor: '#fff',
	                 boxShadow: '0 5px 5px 0 rgba(0,0,0,.14), 0 3px 1px -5px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'
	              };
	            var count=0;
	            var tempCategory;

	         return loops.map((loop)=>{
	             		count++;
	             		tempCategory=cat;
	             		if(count<loops.length)
	                    cat=cat.subcategory[parseInt(loops[count])-1];
	                    return (
		                 	<div  key={tempCategory.categoryName} style={style}  >
		                    <SubCategoryList catval={tempCategory} catNum={parseInt(loops[count])-1}/>
		                    </div>
	                     );
	            }); 
	         }
	       else{
	        var cat=this.props.Category;
	        return (
	        		<div style={{
	                float:'left',
	                marginLeft:'10px',
	                padding:10,
	                backgroundColor: '#fff',
	                boxShadow: '0 5px 5px 0 rgba(0,0,0,.14), 0 3px 1px -5px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)'
	              }}  >
	        			<SubCategoryList style={style} catval={cat}/>
	        			</div>
	       			);
	      
	       }
	    }
	    render() {

	        return (
	       
	            <ul style={{listStyleType: 'none'}}>
	                {this.showDivs()}
	            </ul>
           
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
    return bindActionCreators({addNewCategory: addNewCategory}, dispatch);
}


export default connect(mapStateToProps,matchDispatchToProps)(ShowSubCategoryList);
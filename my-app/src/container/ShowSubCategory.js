import React, {Component} from 'react';
import {connect} from 'react-redux';
import SubCategoryList from './SubCategoryList'

class ShowSubCategoryList extends Component {
	    showDivs(){
	        var Track=this.props.Track;
	         if(Track.length>1){
	            var loops=Track[Track.length-1].split("-");
	            var cat=this.props.Category;
	            var style={
	                float:'left'
	              };
	            var count=0;
	            var tempCategory,previous;

	         return loops.map((loop)=>{
	             		count++;
	             		tempCategory=cat[parseInt(loop)-1];
	                    cat=cat[parseInt(loop)-1].subcategory;
	                    return (
		                 	<div  key={tempCategory.name} style={style}  >
		                    <SubCategoryList  catval={tempCategory}/>
		                    </div>
	                     );
	            }); 
	         }
	       else{
	        var cat=this.props.Category[parseInt(Track[0])-1];
	        return (
	        			<SubCategoryList style={style} catval={cat}/>
	       			);
	       }
	    }
	    render() {

	           if (!this.props.selectedCategory) {
	            return (<div></div>);
	       		 }
	        return (
	            <ul >
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

export default connect(mapStateToProps)(ShowSubCategoryList);
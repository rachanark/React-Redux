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
	          //  loops.splice(0,1);
	            var cat=this.props.Category;
	            var style={
	                float:'left',
	                padding:10,
	                border:'1px solid black'
	              };
	            var count=0;
	            var tempCategory,previous;

	         return loops.map((loop)=>{
	             		count++;
	             		tempCategory=cat;
	                    cat=cat.subcategory[parseInt(loops[count])-1];
	                    return (
		                 	<div  key={tempCategory.name} style={style}  >
		                    <SubCategoryList  catval={tempCategory}/>
		                    </div>
	                     );
	            }); 
	         }
	       else{
	        var cat=this.props.Category;
	        return (
	        			<div  key={this.props.Category.name} style={{
	                float:'left',
	                padding:10,
	                border:'1px solid black'
	              }}  >
	        			<SubCategoryList style={style} catval={cat}/>
	        			</div>
	       			);
	       }
	    }
	    render() {

		        	 /* if (!this.props.selectedCategory) {
		            return (<div></div>);
		       		 }*/

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
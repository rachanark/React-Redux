/*import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';
import {addNewCategory,selectSubCategory,selectCategory,editCategory,removeCategory} from '../action';

 function formatCategory(category){
    var subcat=category.subcategory;
        for(var i=0;i<subcat.length;i++){
            subcat[i].id=category.id+"-"+(i+1);
            if(subcat[i].subcategory.length==0)
                continue;
            else
                formatCategory(subcat[i])
        }
	}
	
export  const selectCategory = (category,Track,main) => {
	   	    return {
	        type: 'USER_SELECTED_CAT',
	        payload:{
	        	subcategory:category,
	        	Track:Track,
	        	category:main
	        } 
	    }
	};
export  const OnLoad = (main,track) => {
			console.log("Action creater works");
			console.log(main);
	   	    return {
	        type: 'ON_LOAD_CONSTANTS',
	        payload:{
	        	category:main,
	        	Track:track
	        } 
	    }
	};

export  const selectSubCategory = (category,Track,main) => {
	    return {
	        type: 'SUB_CATEGORY_SELECTED',
	        payload:{
	        	subcategory:category,
	        	Track:Track,
	        	category:main
	    }
	        }
	};
export  const editCategory = (main,Track,value,category) => {
	   	    return {
	        type: 'EDIT_CATEGORY',
	        payload:{
	        	category:main,
	        	Track:Track,
	        	editCat:category,
	        	editval:value
	        } 
	    }
	};
	export  const removeCategory = (main,category,Track) => {
	   	    return {
	        type: 'REMOVE_CATEGORY',
	        payload:{
	        	removeCat:category,
	        	Track:Track,
	        	category:main
	        } 
	    }
	};
export const addNewCategory1 = (newCategory,categaoryValue,Category,Track) => {
			var categaoryValue=categaoryValue;
        	var newCategory=newCategory;
        	var mainCategory=Category;
        	var loops=categaoryValue.id.split('-');
            var obj={};
        			if(loops.length==1){
                        var newCat={
                            name:newCategory,
                            id:mainCategory.id+"-"+(mainCategory.subcategory.length+1),
                            subcategory:[]
                            };
        				mainCategory.subcategory.push(newCat);
        			}
        			else{
        				var temp=mainCategory;
		        		for(var i=1;i<loops.length;i++){
		        			temp=temp.subcategory[parseInt(loops[i])-1];
		        		}
                        var newCat={
                            name:newCategory,
                            id:temp.id+"-"+(temp.subcategory.length+1),
                            subcategory:[]
                        };
		        		temp.subcategory.push(newCat);
        			}
        	obj=JSON.parse(JSON.stringify(mainCategory));
        	return function(dispatch) {        	
        	axios.get('https://acinventory-204612.appspot.com/rest/getCategoryTree').then(res =>{
            console.log("ResponseAdd");
            console.log(res.data);
            this.props.addNewCategory(obj,Track);
           
         });

	}

export  const addNewColor = (value,Track,Category) => {
	console.log("Add color action");
	console.log(Category);
	    return {
	        type: 'ADD_NEW_COLOR',
	        payload:{
	        	  value:value,
	        	  Track:Track,
	        	  category:Category
	   			 }
	        }
	};
export  const addNewShelf = (value,Track,Category) => {
	console.log("Add shelf action");
	console.log(Category);
	    return {
	        type: 'ADD_NEW_SHELF',
	        payload:{
	        	  value:value,
	        	  Track:Track,
	        	  category:Category
	   			 }
	        }
	};
/*
function matchDispatchToProps(dispatch){
    return bindActionCreators({selectCategory: selectCategory,selectSubCategory:selectSubCategory,
      removeCategory:removeCategory,editCategory:editCategory,addNewCategory:addNewCategory}, dispatch);
}

function mapStateToProps(state) {
    return {
       Category: state.Category,
        selectedCategory:state.selectedCategory,
        Track:state.Track
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(CategoryActions);*/

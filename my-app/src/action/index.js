	
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
export  const addNewCategory = (newCategory,categaoryValue,Category,Track) => {
		console.log("Able to add1 ")
		console.log(Category);
	    return {
	        type: 'ADD_NEW_CATEGORY',
	        payload:{
	        	 newCategory:newCategory,
	        	 categaoryValue:categaoryValue,
	        	 category:Category,
	        	  Track:Track
	    }
	        }
	};

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


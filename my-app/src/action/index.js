	
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


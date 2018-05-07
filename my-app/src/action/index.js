	
export  const selectCategory = (category) => {
	   	    return {
	        type: 'USER_SELECTED',
	        payload: category
	    }
	};


export  const selectSubCategory = (category) => {
	 //   console.log("You clicked: ", category.name);
	    return {
	        type: 'SUB_CATEGORY_SELECTED',
	        payload: category.subcategory
	    }
	};





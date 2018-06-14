	
export  const selectCategory = (category,Track,main,master) => {
	   	    return {
	        type: 'USER_SELECTED_CAT',
	        payload:{
	        	subcategory:category,
	        	Track:Track,
	        	category:main,
	        	master:master
	        } 
	    }
	};
export  const OnLoad = (main,track,master) => {
			console.log("Action creater works");
			console.log(main);
	   	    return {
	        type: 'ON_LOAD_CONSTANTS',
	        payload:{
	        	category:main,
	        	Track:track,
	        	master:master
	        } 
	    }
	};
export  const OnLoadMaster = (main,track,master) => {
  return {
	        type: 'ON_LOAD_MASTER',
	        payload:{
	        	category:main,
	        	Track:track,
	        	master:master
	        } 
	    }

};

export  const selectSubCategory = (category,Track,main,master) => {
	    return {
	        type: 'SUB_CATEGORY_SELECTED',
	        payload:{
	        	subcategory:category,
	        	Track:Track,
	        	category:main,
	        	master:master
	    }
	        }
	};
export  const editCategory = (main,Track,master) => {
	   	    return {
	        type: 'EDIT_CATEGORY',
	        payload:{
	        	category:main,
	        	Track:Track,
	        	master:master
	        } 
	    }
	};
	export  const removeCategory = (main,Track,master) => {
	   	    return {
	        type: 'REMOVE_CATEGORY',
	        payload:{
	        	Track:Track,
	        	category:main,
	        	master:master
	        } 
	    }
	};
export  const addNewCategory = (Category,Track,master) => {
		console.log("Able to add1 ")
		console.log(Category);
	    return {
	        type: 'ADD_NEW_CATEGORY',
	        payload:{
	        	 category:Category,
	        	  Track:Track,
	        	  master:master
	    }
	        }
	};

export  const addNewColor = (Category,Track,master) => {
	console.log("Add color action");
	console.log(Category);
	    return {
	        type: 'ADD_NEW_COLOR',
	        payload:{
	        	 category:Category,
	        	  Track:Track,
	        	  master:master
	    }
	        }
	};
export  const addNewShelf = (Category,Track,master) => {
	console.log("Add shelf action");
	console.log(Category);
	    return {
	        type: 'ADD_NEW_SHELF',
	        payload:{
	        	 category:Category,
	        	  Track:Track,
	        	  master:master
	    }
	        }
	};

	export  const addNewSize = (Category,Track,master) => {
	console.log("Add size action");
	console.log(Category);
	    return {
	        type: 'ADD_NEW_SIZE',
	        payload:{
	        	 category:Category,
	        	  Track:Track,
	        	  master:master
	    }
	        }
	};


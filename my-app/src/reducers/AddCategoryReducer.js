function  AddCategoryReducer (state = null, action) {
	//console.log("Add Reducer");
    switch (action.type) {
        case 'ADD_NEW_CATEGORY':
        	var categaoryValue=action.payload.categaoryValue[0];
        	var newCategory=action.payload.newCategory;
        	var mainCategory=action.payload.category;
        	var loops=categaoryValue.id.split('-');
        		loops.splice(loops.length-1,1);
        	if(loops.length==0){
        		mainCategory.push({
        			name:newCategory,
        			subcategory:null
        		});
        	}
        	else{
        		var temp=mainCategory;
        		for(var i=0;i<loops.length;i++){
        			temp=temp[parseInt(loops[i])];
        		}
        		temp.subcategory.ppush({
        			name:newCategory,
        			subcategory:null
        		});
        	}
        	console.log("Add category action11")
        	console.log(mainCategory);
            return mainCategory;
    }
    return state;
}

export default AddCategoryReducer;
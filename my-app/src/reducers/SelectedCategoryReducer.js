 function SelectedCategoryReducer (state = null, action) {
    switch (action.type) {
        case 'SUB_CATEGORY_SELECTED':
       		 console.log("selected Cat");
        	console.log(action.payload.subcategory);
            return action.payload.subcategory;
    }
    return state;
}

export default SelectedCategoryReducer;

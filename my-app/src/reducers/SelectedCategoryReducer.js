 function SelectedCategoryReducer (state = null, action) {
	console.log('Action Listener22');
    switch (action.type) {
        case 'USER_SELECTED':
            return action.payload;
        case 'SUB_CATEGORY_SELECTED':
            return action.payload;
    }
    return state;
}

export default SelectedCategoryReducer;

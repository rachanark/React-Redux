function  AddFieldReducer (state = null, action) {
    console.log(action.type);
    var value;
    switch (action.type) {
        case 'ADD_NEW_COLOR':
            value=action.payload.value;
            console.log("Added color"+value);
        	//api call here
           return 1;
        case 'ADD_NEW_SHELF':
         value=action.payload.value;
         console.log("Added Shelf"+value);
        	//api call here
            return 1;
    }
   return state;
}

export default AddFieldReducer;
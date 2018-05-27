 function MasterDataReducer(state = null, action){
 	switch (action.type) {
 		case 'ON_LOAD_MASTER':
 					return action.payload.master;
 		 case 'ADD_NEW_COLOR':
            var value=action.payload.value;
            console.log("Added color"+value);
        	//api call here
           return 1;
        case 'ADD_NEW_SHELF':
         var value=action.payload.value;
         console.log("Added Shelf"+value);
        	//api call here
            return 1;

 			}
 	if(state==null)
 		return null;
 	else{
		console.log("Master action elze");
		console.log( action.payload.master);
		return action.payload.master;
		}
		
	
    	
}
 export default MasterDataReducer;
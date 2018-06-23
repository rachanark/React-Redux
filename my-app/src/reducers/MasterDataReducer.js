 function MasterDataReducer(state = null, action){
 	switch (action.type) {
 		case 'ON_LOAD_MASTER':
 					return JSON.parse(JSON.stringify(action.payload.master));
 		 case 'ADD_NEW_COLOR':
           return JSON.parse(JSON.stringify(action.payload.master));

        case 'ADD_NEW_SHELF':
           return JSON.parse(JSON.stringify(action.payload.master));
      case 'ADD_NEW_SIZE':
           return JSON.parse(JSON.stringify(action.payload.master));

 	}
 	if(state==null)
 		return null;
 	else{
		return action.payload.master;
		}
		
	
    	
}
 export default MasterDataReducer;
import axios from 'axios';
import {SAVE_MASTER_DATA} from '../ApiConstants'
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
		console.log("Master action elze");
		console.log( action.payload.master);
		return action.payload.master;
		}
		
	
    	
}
 export default MasterDataReducer;
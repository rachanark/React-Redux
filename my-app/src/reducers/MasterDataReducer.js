import axios from 'axios';
import {SAVE_MASTER_DATA} from '../ApiConstants'
 function MasterDataReducer(state = null, action){
 	switch (action.type) {
 		case 'ON_LOAD_MASTER':
 					return JSON.parse(JSON.stringify(action.payload.master));
 		 case 'ADD_NEW_COLOR':
            /*var value=action.payload.value;
            console.log("Added color"+value);
            var obj={color:[{color:value}]}
        	 axios.post(SAVE_MASTER_DATA,obj).then(res =>{
                    console.log("Added Successfully");
                    action.payload.master.color.push(res.data);
                    var x=JSON.parse(JSON.stringify(action.payload.master));
                    return x;
                });*/
           return JSON.parse(JSON.stringify(action.payload.master));
        case 'ADD_NEW_SHELF':
      /*   var value=action.payload.value;
         var obj={shelf:[{shelfLocation:value}]}
         console.log("Added Shelf"+value);
        	axios.post(SAVE_MASTER_DATA,obj).then(res =>{
                    console.log("Added Successfully");
                     action.payload.master.shelf.push(res.data);
                    var x=JSON.parse(JSON.stringify(action.payload.master));
                    return x;
                     });*/
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
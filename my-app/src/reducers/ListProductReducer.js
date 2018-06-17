 function ListProductReducer(state = null, action){
 	switch (action.type) {
 		case 'LIST_PRODUCT':
 					return JSON.parse(JSON.stringify(action.payload.master));
 		}
 	if(state==null)
 		return null;
 	else{
 		if( typeof action.payload.listProduct != 'undefined')
 			return action.payload.listProduct
 		return null;
 	}
}
 export default ListProductReducer;
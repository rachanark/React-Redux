function assignLevel(subcat,parentlevel,level){
    //subcat.levelId=parentlevel+"-"+(level+1);
    if(subcat.subcategory!=null)
    for(var i=0;i<subcat.subcategory.length;i++)
    if(subcat.subcategory[i]!=null){
            subcat.subcategory[i].levelId=subcat.levelId+"-"+(i+1);
        assignLevel(subcat.subcategory[i],subcat.levelId);
    }
}

function formLevels(json){
    for(var i=0;i<json.subcategory.length;i++){
        if(json.subcategory[i]==null)
        continue;
        else{
            json.subcategory[i].levelId=json.levelId+"-"+(i+1);
            assignLevel(json.subcategory[i],json.levelId);  
        }
    }
}
 function CategoryReducer(state = null, action){
 	switch (action.type) {
 		case 'ON_LOAD_CONSTANTS':
                    formLevels(action.payload.category);
                    console.log(action.payload.category);
 					return action.payload.category;
        case 'REMOVE_CATEGORY':
           
            return action.payload.category;

        case 'EDIT_CATEGORY':  
     
            return action.payload.category;

        case 'ADD_NEW_CATEGORY':
        	
        	var obj=JSON.parse(JSON.stringify(action.payload.category));;
        	console.log("Add category action 00")
        	console.log(obj);
            return obj;
             //return action.payload.category;

    }

    if(state==null){
        return null;
        /*return (
        {   name:'main',
            id:'1',
                subcategory:
                [
                    {   name:'Ethnic',
                        id:'1-1',
                        subcategory:[
                            {name : 'saree',
                                id:'1-1-1',
                            subcategory:[
                                    {  name:'Cotton',
                                        id:'1-1-1-1',
                                       subcategory:[]
                                    }                                ]
                            }
                        ]
                    },
                        {   name:'Western',
                        id:'1-2',
                        subcategory:[
                            {name : 'BottomWear',
                            id:'1-2-1',
                            subcategory:[
                                    {  name:'Jeans',
                                    id:'1-2-1-1',
                                       subcategory:[]
                                    }
                                ]
                            }
                        ]
                    }
                ]
        });*/
     }
	else{
		console.log("Add category action elze");
		console.log( action.payload.category);
		return action.payload.category;
		}
		
	
    	
}
 export default CategoryReducer;
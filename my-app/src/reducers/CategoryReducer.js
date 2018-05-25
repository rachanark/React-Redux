function formatCategory(category){
    var subcat=category.subcategory;
        for(var i=0;i<subcat.length;i++){
            subcat[i].id=category.id+"-"+(i+1);
            if(subcat[i].subcategory.length==0)
                continue;
            else
                formatCategory(subcat[i])
        }
}
 function CategoryReducer(state = null, action){
 	switch (action.type) {
 		case 'ON_LOAD_CONSTANTS':
 					return action.payload.category;
        case 'REMOVE_CATEGORY':
            var removeCat=action.payload.removeCat;
            var loops=removeCat.id.split('-');//1-1-2
           // loops.splice(0,1);
           var obj={};
            var mainCategory=action.payload.category;
            var temp=mainCategory.subcategory;//l2
           // var i=0;
            for(var i=1;i<loops.length-1;i++){
                            temp=temp[parseInt(loops[i])-1].subcategory;
                        }
            temp.splice(parseInt(loops[loops.length-1])-1,1);
            obj=JSON.parse(JSON.stringify(mainCategory));;
            console.log("Remove category action 00")
            formatCategory(obj);
            console.log(obj);
            return obj;

        case 'EDIT_CATEGORY':  
            var editCat=action.payload.editCat;
            var editval=action.payload.editval;
            var loops=editCat.id.split('-');
            loops.splice(0,1);
            var mainCategory=action.payload.category;
            var temp=mainCategory.subcategory;
           // var i=0;
            for(var i=0;i<loops.length-1;i++){
                            temp=temp[parseInt(loops[i])-1].subcategory;
                        }
            temp[parseInt(loops[loops.length-1])-1].name=editval;
            console.log("Edited");
            console.log(mainCategory);
            return mainCategory;     
        case 'ADD_NEW_CATEGORY':
        	var categaoryValue=action.payload.categaoryValue;
        	var newCategory=action.payload.newCategory;
        	var mainCategory=action.payload.category;
        	var loops=categaoryValue.id.split('-');
            var obj={};
        		//loops.splice(loops.length-1,1);
        			if(loops.length==1){
        				mainCategory.subcategory.push({
                			name:newCategory,
                            id:mainCategory.id+"-"+(mainCategory.subcategory.length+1),
                			subcategory:[]
        		});
        			}
        			else{
        				var temp=mainCategory;
		        		for(var i=1;i<loops.length;i++){
		        			temp=temp.subcategory[parseInt(loops[i])-1];
		        		}
		        		temp.subcategory.push({
		        			name:newCategory,
                            id:temp.id+"-"+(temp.subcategory.length+1),
		        			subcategory:[]
		        		});
        			}
        	obj=JSON.parse(JSON.stringify(mainCategory));;
        	console.log("Add category action 00")
        	console.log(mainCategory);
            return obj;
    }

    if(state==null){
		//return [];
        return (
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
        });
     }
	else{
		console.log("Add category action elze");
		console.log( action.payload.category);
		return action.payload.category;
		}
		
	
    	
}
 export default CategoryReducer;
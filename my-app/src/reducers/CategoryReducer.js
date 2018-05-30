function formatCategory(category){
    var subcat=category.subcategory;
        for(var i=0;i<subcat.length;i++){
            subcat[i].levelId=category.levelId+"-"+(i+1);
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
            /*var removeCat=action.payload.removeCat;
            var loops=removeCat.levelId.split('-');
           var obj={};
            var mainCategory=action.payload.category;
            var temp=mainCategory.subcategory;//l2
            for(var i=1;i<loops.length-1;i++){
                            temp=temp[parseInt(loops[i])-1].subcategory;
                        }
            temp.splice(parseInt(loops[loops.length-1])-1,1);
            obj=JSON.parse(JSON.stringify(mainCategory));;
            console.log("Remove category action 00")
            formatCategory(obj);
            axios.post('https://acinventory-204612.appspot.com/rest/updateCatTree',obj).then(res =>{
                    console.log("REmoved Successfully")
                });
            console.log(obj);
            return obj;*/
            return action.payload.category;

        case 'EDIT_CATEGORY':  
            /*var editCat=action.payload.editCat;
            var editval=action.payload.editval;
            var loops=editCat.levelId.split('-');
            loops.splice(0,1);
            var mainCategory=action.payload.category;
            var temp=mainCategory.subcategory;
            for(var i=0;i<loops.length-1;i++){
                temp=temp[parseInt(loops[i])-1].subcategory;
            }
            temp[parseInt(loops[loops.length-1])-1].name=editval;
            axios.post('https://acinventory-204612.appspot.com/rest/updateCat',temp[parseInt(loops[loops.length-1])-1]).then(res =>{
                    console.log("REmoved Successfully")
                });
            console.log("Edited");
            console.log(mainCategory);
            return mainCategory;   */  
            return action.payload.category;

        case 'ADD_NEW_CATEGORY':
        	/*var categaoryValue=action.payload.categaoryValue;
        	var newCategory=action.payload.newCategory;
        	var mainCategory=action.payload.category;
        	var loops=categaoryValue.levelId.split('-');
            var obj={};
        			if(loops.length==1){
                        var newCat={
                            name:newCategory,
                            levelId:mainCategory.levelId+"-"+(mainCategory.subcategory.length+1),
                            subcategory:[]
                            };
                    axios.post('https://acinventory-204612.appspot.com/rest/createCat',obj).then(res =>{
                    console.log("REmoved Successfully")
                });   
        				mainCategory.subcategory.push(newCat);
        			}
        			else{
        				var temp=mainCategory;
		        		for(var i=1;i<loops.length;i++){
		        			temp=temp.subcategory[parseInt(loops[i])-1];
		        		}
                        var newCat={
                            name:newCategory,
                            levelId:temp.levelId+"-"+(temp.subcategory.length+1),
                            subcategory:[]
                        };
                        axios.post('https://acinventory-204612.appspot.com/rest/createCat',obj).then(res =>{
                            console.log("REmoved Successfully")
                        }); 
		        		temp.subcategory.push(newCat);
        			}*/
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
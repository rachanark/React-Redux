 function CategoryReducer(state = null, action){
 	console.log("Ctae ");
 	console.log(action.payload);
 	switch (action.type) {
        case 'ADD_NEW_CATEGORY':
        	var categaoryValue=action.payload.categaoryValue[0];
        	var newCategory=action.payload.newCategory;
        	var mainCategory=action.payload.category;
        	var loops=categaoryValue.id.split('-');
        		loops.splice(loops.length-1,1);
        	if(loops.length==0){
        		mainCategory.subcategory.push({
        			name:newCategory,
        			subcategory:null
        		});
        	}
        	else{
        			if(loops.length==1){
        				mainCategory[parseInt(loops[0])-1].subcategory.push({
        			name:newCategory,
        			subcategory:null
        		});
        			}
        			else{
        				var temp=mainCategory;
		        		for(var i=0;i<loops.length;i++){
		        			temp=temp[parseInt(loops[i])-1].subcategory;
		        		}
		        		temp.push({
		        			name:newCategory,
		        			subcategory:null
		        		});
        			}
        		
        	}
        	console.log("Add category action 00")
        	console.log(mainCategory);
            return mainCategory;
    }

    if(state==null){
    	var r= [
		{	name:'main',
			id:'1',
				subcategory:
				[
					{	name:'Ethnic',
						id:'1-1',
						subcategory:[
							{name : 'saree',
								id:'1-1-1',
							subcategory:[
									{  name:'Cotton',
										id:'1-1-1-1',
									   subcategory:null
									}
								]
							}
						]
					},
						{	name:'Western',
						id:'1-2',
						subcategory:[
							{name : 'BottomWear',
							id:'1-2-1',
							subcategory:[
									{  name:'Jeans',
									id:'1-2-1-1',
									   subcategory:null
									}
								]
							}
						]
					}
				]
		}
	];
    	console.log("Add category action if");
		console.log( r);
		return r
    }
	
	else{
		console.log("Add category action elze");
		console.log( action.payload.category);
		return action.payload.category;
		}
		
	
    	
}

export default CategoryReducer;
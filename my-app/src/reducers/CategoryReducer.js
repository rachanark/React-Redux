 function CategoryReducer(){
 	console.log('Category Creater');
	return [
		{	name:'main',
			id:1,
				subcategory:
				[
					{	name:'Ethnic',
						id:21,
						subcategory:[
							{name : 'saree',
								id:31,
							subcategory:[
									{  name:'Cotton',
										id:41,
									   subcategory:null
									}
								]
							}
						]
					},
						{	name:'Western',
						id:22,
						subcategory:[
							{name : 'BottomWear',
							id:32,
							subcategory:[
									{  name:'Jeans',
									id:34,
									   subcategory:null
									}
								]
							}
						]
					}
				]
	}
	]
}

export default CategoryReducer;
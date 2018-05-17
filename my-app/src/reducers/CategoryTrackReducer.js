 function CategoryTrackReducer(state = null, action){
 	    switch (action.type) {
        case 'USER_SELECTED_CAT':
        		console.log("TrackReducer");
        		console.log(action.payload);
	        	var Track=action.payload.Track;
	        	var selectedCategory=action.payload.subcategory.id;
	        	if(Track.length>1){
		        	var selectedCategoryLength=selectedCategory.split("-").length;
		        	var LastTrack=Track[Track.length-1].split("-").length;
		        	if (LastTrack>=selectedCategoryLength) {
		        		Track.splice(selectedCategoryLength-1,LastTrack);
		        		Track.push(selectedCategory);
		        		console.log("TrackReducer");
		        		console.log(Track);
		        		return Track;
		        	}
		        	else{
		        		Track.push(selectedCategory);
		        		console.log("TrackReducer");
		        		console.log(Track);
		        		return Track;
		        	}
	        	}
	        	 Track.push(selectedCategory);
			return Track;       
    }
    if(action.payload===undefined)
   { 
   		return ['1'];
   }
	
	else
	return action.payload.Track;
}

export default CategoryTrackReducer;
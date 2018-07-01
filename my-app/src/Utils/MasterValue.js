export const getColor = (id,master) =>{
	for(var i=0;i<master.color.length;i++){
		if(master.color[i].colorId==id)
			return master.color[i].color;
	}
};
export const getShelf = (id,master) =>{
	for(var i=0;i<master.shelf.length;i++){
		if(master.shelf[i].shelfId==id)
			return master.shelf[i].shelfLocation;
	}
};
export const getSize = (id,master) =>{
	for(var i=0;i<master.size.length;i++){
		if(master.size[i].sizeId==id)
			return master.size[i].size;
	}
};
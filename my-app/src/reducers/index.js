import {combineReducers} from 'redux';
import Category from './CategoryReducer';
import SelectedCategoryReducer from './SelectedCategoryReducer';
import CategoryTrackReducer from './CategoryTrackReducer';
import AddFieldReducer from './AddFieldReducer';
import AddCategoryReducer from './AddCategoryReducer';

const allReducers=combineReducers({
	Category: Category,
	selectedCategory:SelectedCategoryReducer,
	Track:CategoryTrackReducer,
	AddField:AddFieldReducer,
	//AddCategory:AddCategoryReducer
});

export default allReducers;

import {combineReducers} from 'redux';
import Category from './CategoryReducer';
import SelectedCategoryReducer from './SelectedCategoryReducer';
const allReducers=combineReducers({
	categories: Category,
	selectedCategory:SelectedCategoryReducer
});

export default allReducers;

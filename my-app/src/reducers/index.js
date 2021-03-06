import {combineReducers} from 'redux';
import Category from './CategoryReducer';
import MasterDataReducer from './MasterDataReducer';
import CategoryTrackReducer from './CategoryTrackReducer';
import ListProductReducer from './ListProductReducer';


const allReducers=combineReducers({
	Category: Category,
	MasterDataReducer:MasterDataReducer,
	Track:CategoryTrackReducer
});

export default allReducers;

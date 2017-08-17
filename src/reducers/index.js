import { combineReducers } from 'redux';
import { UPDATE_MAINPAGE_BOOKS, UPDATE_SEARCHPAGE_BOOKS, UPDATE_SEARCHTERM } from '../actions';

const mainPageBooks = (state = [], action) => {
	if (action.type === UPDATE_MAINPAGE_BOOKS) {
		return action.payload;
	}
	return state;
};
const searchPageBooks = (state = [], action) => {
	if (action.type === UPDATE_SEARCHPAGE_BOOKS) {
		return action.payload;
	}
	return state;
};
const searchTerm = (state = '', action) => {
	if (action.type === UPDATE_SEARCHTERM) {
		return action.payload;
	}
	return state;
};

const rootReducer = combineReducers({
	mainPageBooks,
	searchPageBooks,
	searchTerm
});
export default rootReducer;

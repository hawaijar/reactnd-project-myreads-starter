import { combineReducers } from 'redux';
import { categories } from '../constant';
import {
	UPDATE_MAINPAGE,
	UPDATE_BOOK,
	MAINPAGE_IS_LOADING,
	MAINPAGE_HAS_ERRORED,
	UPDATE_SEARCHPAGE,
	SEARCHPAGE_IS_LOADING,
	SEARCHPAGE_HAS_ERRORED,
	CURRENT_PAGE
} from '../actions';

/* eslint-disable no-useless-computed-key */
/*
const initialState = {
	['To Kill a Mockingbird']: {
		title: 'To Kill a Mockingbird',
		authors: ['Harper Lee'],
		thumbnail:
			'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
		shelf: 'Currently Reading'
	},
	['1776']: {
		title: '1776',
		authors: ['David McCullough'],
		thumbnail:
			'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api',
		shelf: 'Want to Read'
	},
	['The Hobbit']: {
		title: 'The Hobbit',
		authors: ['J.R.R. Tolkien'],
		thumbnail:
			'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api',
		shelf: 'Read'
	}
};
*/

const mainPageBooks = (state = {}, action) => {
	if (action.type === UPDATE_MAINPAGE) {
		const data = action.payload;
		let books = {};
		/* eslint-disable no-shadow */
		books = data.reduce((books, rawBook) => {
			const book = {
				title: rawBook.title,
				authors: rawBook.authors,
				thumbnail: rawBook.imageLinks ? rawBook.imageLinks.thumbnail : '',
				shelf: rawBook.shelf in categories ? categories[rawBook.shelf] : 'None'
			};
			/* eslint-disable no-param-reassign */
			books[`${book.title}`] = book;
			return books;
		}, {});

		return books;
	}
	if (action.type === UPDATE_BOOK) {
		const { path, book } = action.payload;
		if (path === '/' || path === '/search') {
			return { ...state, [book.title]: book };
		}
	}
	return state;
};
const searchPageBooks = (state = {}, action) => {
	if (action.type === UPDATE_SEARCHPAGE) {
		const data = action.payload;
		let books = {};
		/* eslint-disable no-shadow */
		books = data.reduce((books, rawBook) => {
			const book = {
				title: rawBook.title,
				authors: rawBook.authors,
				thumbnail: rawBook.imageLinks ? rawBook.imageLinks.thumbnail : '',
				shelf: rawBook.shelf in categories ? categories[rawBook.shelf] : 'None'
			};
			/* eslint-disable no-param-reassign */
			books[`${book.title}`] = book;
			return books;
		}, {});

		return books;
	}

	if (action.type === UPDATE_BOOK) {
		const { path, book } = action.payload;
		if (path === '/search') {
			return { ...state, [book.title]: book };
		}
	}

	return state;
};

const isMainPageLoading = (state = false, action) => {
	if (action.type === MAINPAGE_IS_LOADING) {
		return action.payload;
	}
	return state;
};
const hasErroredMainPage = (state = false, action) => {
	if (action.type === MAINPAGE_HAS_ERRORED) {
		return action.payload;
	}
	return state;
};

const isSearchPageLoading = (state = false, action) => {
	if (action.type === SEARCHPAGE_IS_LOADING) {
		return action.payload;
	}
	return state;
};
const hasErroredSearchPage = (state = false, action) => {
	if (action.type === SEARCHPAGE_HAS_ERRORED) {
		return action.payload;
	}
	return state;
};

const currentPagePath = (state = '/', action) => {
	if (action.type === CURRENT_PAGE) {
		return action.payload;
	}
	return state;
};

const rootReducer = combineReducers({
	mainPageBooks,
	isMainPageLoading,
	hasErroredMainPage,
	searchPageBooks,
	isSearchPageLoading,
	hasErroredSearchPage,
	currentPagePath
});
export default rootReducer;

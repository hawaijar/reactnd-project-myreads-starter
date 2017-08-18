import * as BooksAPI from '../BooksAPI';

export const UPDATE_MAINPAGE_BOOKS = 'UPDATE_MAINPAGE_BOOKS';
export const UPDATE_SEARCHPAGE_BOOKS = 'UPDATE_SEARCHPAGE_BOOKS';
export const UPDATE_SEARCHTERM = 'UPDATE_SEARCHTERM';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const ISLOADED_MAINPAGE = 'ISLOADED_MAINPAGE';
export const HASERROR_MAINPAGE = 'HASERROR_MAINPAGE';
export const ISLOADED_SEARCHPAGE = 'ISLOADED_SEARCHPAGE';
export const HASERROR_SEARCHPAGE = 'HASERROR_SEARCHPAGE';

export function updateMainPageBooks(books) {
	return {
		type: UPDATE_MAINPAGE_BOOKS,
		payload: books
	};
}
export function updateisLoadedMainPageBooks(flag) {
	return {
		type: ISLOADED_MAINPAGE,
		payload: flag
	};
}
export function updatehasErrorMainPageBooks(flag, error) {
	return {
		type: HASERROR_MAINPAGE,
		payload: {
			isError: flag,
			errorMsg: error
		}
	};
}
export function updateSearchPageBooks(books) {
	return {
		type: UPDATE_SEARCHPAGE_BOOKS,
		payload: books
	};
}

export function updateSearchTerm(term) {
	return {
		type: UPDATE_SEARCHTERM,
		payload: term
	};
}
export function updateBook(book) {
	return {
		type: UPDATE_BOOK,
		payload: book
	};
}
export function getData() {
	return dispatch => {
		BooksAPI.getAll()
			.then(data => {
				dispatch(updateMainPageBooks(data));
				dispatch(updateisLoadedMainPageBooks(true));
			})
			.catch(err => dispatch(updatehasErrorMainPageBooks(true, err)));
	};
}

import * as BooksAPI from '../BooksAPI';

export const UPDATE_MAINPAGE = 'UPDATE_MAINPAGE';
export const MAINPAGE_IS_LOADING = 'MAINPAGE_IS_LOADING';
export const MAINPAGE_HAS_ERRORED = 'MAINPAGE_HAS_ERRORED';
export const UPDATE_SEARCHPAGE_BOOKS = 'UPDATE_SEARCHPAGE_BOOKS';
export const UPDATE_SEARCHTERM = 'UPDATE_SEARCHTERM';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const ISLOADED_SEARCHPAGE = 'ISLOADED_SEARCHPAGE';
export const HASERROR_SEARCHPAGE = 'HASERROR_SEARCHPAGE';

export function updateMainPage(books) {
	return {
		type: UPDATE_MAINPAGE,
		payload: books
	};
}
export function mainPageIsLoading(flag) {
	return {
		type: MAINPAGE_IS_LOADING,
		payload: flag
	};
}
export function mainPageHasErrored(flag) {
	return {
		type: MAINPAGE_HAS_ERRORED,
		payload: flag
	};
}
export function updateSearchPageBooks(books) {
	return {
		type: UPDATE_SEARCHPAGE_BOOKS,
		payload: books
	};
}

export function updateisLoadedSearchPageBooks(flag) {
	return {
		type: ISLOADED_SEARCHPAGE,
		payload: flag
	};
}
export function updatehasErrorSearchPageBooks(flag, error) {
	return {
		type: HASERROR_SEARCHPAGE,
		payload: {
			isError: flag,
			errorMsg: error
		}
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
export function getBooksFromAPI() {
	return dispatch => {
		dispatch(mainPageIsLoading(true));
		BooksAPI.getAll()
			.then(data => {
				dispatch(updateMainPage(data));
				dispatch(mainPageIsLoading(false));
			})
			.catch(err => dispatch(mainPageHasErrored(true, err)));
	};
}

export function getSearchData(query) {
	return dispatch => {
		if (query === '') {
			dispatch(updateSearchPageBooks([]));
		} else {
			dispatch(updateisLoadedSearchPageBooks(true));
			BooksAPI.search(query)
				.then(data => {
					dispatch(updateSearchPageBooks(data));
					dispatch(updateisLoadedSearchPageBooks(false));
				})
				.catch(() => {
					dispatch(updateSearchPageBooks([]));
					dispatch(updateisLoadedSearchPageBooks(false));
				});
		}
	};
}

import * as BooksAPI from '../BooksAPI';

export const UPDATE_MAINPAGE = 'UPDATE_MAINPAGE';
export const MAINPAGE_IS_LOADING = 'MAINPAGE_IS_LOADING';
export const MAINPAGE_HAS_ERRORED = 'MAINPAGE_HAS_ERRORED';
export const UPDATE_SEARCHPAGE = 'UPDATE_SEARCHPAGE';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const SEARCHPAGE_IS_LOADING = 'SEARCHPAGE_IS_LOADING';
export const SEARCHPAGE_HAS_ERRORED = 'SEARCHPAGE_HAS_ERRORED';
export const CURRENT_PAGE = 'CURRENT_PAGE';

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
export function updateSearchPage(books) {
	return {
		type: UPDATE_SEARCHPAGE,
		payload: books
	};
}
export function updateCurrentPagePath(path) {
	return {
		type: CURRENT_PAGE,
		payload: path
	};
}

export function SearchPageIsLoading(flag) {
	return {
		type: SEARCHPAGE_IS_LOADING,
		payload: flag
	};
}
export function SearchPageHasErrored(flag) {
	return {
		type: SEARCHPAGE_HAS_ERRORED,
		payload: flag
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

export function getSearchDataFromAPI(query) {
	return dispatch => {
		if (query === '') {
			dispatch(updateSearchPage([]));
		} else {
			dispatch(SearchPageIsLoading(true));
			BooksAPI.search(query)
				.then(data => {
					dispatch(updateSearchPage(data));
					dispatch(SearchPageIsLoading(false));
				})
				.catch(() => {
					dispatch(updateSearchPage([]));
					dispatch(SearchPageIsLoading(false));
				});
		}
	};
}

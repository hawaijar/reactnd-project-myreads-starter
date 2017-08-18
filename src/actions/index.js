export const UPDATE_MAINPAGE_BOOKS = 'UPDATE_MAINPAGE_BOOKS';
export const UPDATE_SEARCHPAGE_BOOKS = 'UPDATE_SEARCHPAGE_BOOKS';
export const UPDATE_SEARCHTERM = 'UPDATE_SEARCHTERM';
export const UPDATE_BOOK = 'UPDATE_BOOK';

export function updateMainPageBooks(books) {
	return {
		type: UPDATE_MAINPAGE_BOOKS,
		payload: books
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

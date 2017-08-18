import React from 'react';
import { connect } from 'react-redux';
import BookShelf from './BookShelf';
import * as Constants from '../constant';
import '../App.scss';

const Library = ({ books }) => {
	function createBooks(books, targetShelf) {
		return books.filter(book => book.shelf === targetShelf);
	}
	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				<div>
					<BookShelf
						shelf={Constants.categories.CURRENT[1]}
						books={createBooks(books, Constants.categories.CURRENT[1])}
					/>
					<BookShelf
						shelf={Constants.categories.WISH[1]}
						books={createBooks(books, Constants.categories.WISH[1])}
					/>
					<BookShelf
						shelf={Constants.categories.READ[1]}
						books={createBooks(books, Constants.categories.READ[1])}
					/>
				</div>
			</div>
		</div>
	);
};

function mapStateToProps(state, ownProps) {
	return {
		books: state.mainPageBooks
	};
}

export default connect(mapStateToProps)(Library);

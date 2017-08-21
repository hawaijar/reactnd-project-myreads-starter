import React from 'react';
import { connect } from 'react-redux';
import * as Constants from '../constant';
import { updateBook } from '../actions';
import { update } from '../BooksAPI';

const Book = props => {
	const { dispatch, book, path } = props;
	function handleUpdate(event, book) {
		const updatedBook = { ...book };
		updatedBook.shelf = event.target.value;
		dispatch(updateBook(updatedBook));
	}
	return (
		<div className="book">
			<div className="book-top">
				<div
					className="book-cover"
					style={{
						width: 128,
						height: 193,
						backgroundImage: `url(${book.thumbnail})`
					}}
				>
					{true}
				</div>
				<div className="book-shelf-changer">
					<select value={book.shelf} onChange={e => handleUpdate(e, book)}>
						<option value="default" disabled>
							Move to...
						</option>
						<option value="Currently Reading">Currently Reading</option>
						<option value="Want to Read">Want to Read</option>
						<option value="Read">Read</option>
						<option value="None">None</option>
					</select>
				</div>
			</div>
			<div className="book-title">
				{book.title}
			</div>
			{book.authors.map(author =>
				<div key={author} className="book-authors">
					{author}
				</div>
			)}
		</div>
	);
};

function mapStateToProps(state, ownProps) {
	return {
		currentPagePath: state.currentPagePath
	};
}

export default connect(mapStateToProps, null)(Book);

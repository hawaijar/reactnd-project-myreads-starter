/**
 * Created by hawaijar on 7/4/17.
 */

import React from 'react';
import {PropTypes} from 'prop-types';
import Book from './book';

const BookShelf = (props) => {
    const {shelf, books, moveBookToAnotherShelf} = props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.title}>
                            <Book
                                shelf={shelf}
                                book={book}
                                moveBookToAnotherShelf={moveBookToAnotherShelf}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )

};

BookShelf.propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    moveBookToAnotherShelf: PropTypes.func
};
BookShelf.defaultProps = {
    shelf: 'Read',
    books: []
};

export default BookShelf;

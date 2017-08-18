import React from 'react';
import Book from './Book';
import * as Constants from '../constant';

const BookShelf = ({ books, shelf }) => {
  const title = 'None (not in any shelf)';
  return (
    books.length > 0 &&
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {shelf === Constants.categories.NONE[1] ? title : shelf}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) =>
            <li key={book.title}>
              <Book {...book} />
            </li>
          )}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;

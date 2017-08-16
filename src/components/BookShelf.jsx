/**
 * Created by hawaijar on 7/4/17.
 */

// @flow
type Props<T> = T & {
  shelf: string,
  books: Array<BookType>,
  updateBook: (book: BookType) => void
};

import React from 'react';
import Book from './Book';
import * as Constants from '../constant/index';

function BookShelf<T: *>({ shelf = '', books = [], updateBook }: Props<T>) {
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
            <li key={index}>
              <Book shelf={shelf} book={book} updateBook={updateBook} />
            </li>
          )}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;

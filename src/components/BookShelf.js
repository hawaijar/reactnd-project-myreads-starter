/**
 * Created by hawaijar on 7/4/17.
 */

// @flow
type Props = {
  shelf: string,
  books: Array<BookType>,
  updateBook: Function,
};

import React from 'react';
import { string, array } from 'prop-types';
import Book from './Book';
import * as Constants from '../constant/index';

const BookShelf = (props: Props) => {
  const { shelf, books, updateBook } = props;
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
            </li>,
          )}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  shelf: string.isRequired,
  books: array.isRequired,
};
BookShelf.defaultProps = {
  shelf: '',
  books: [],
};

export default BookShelf;

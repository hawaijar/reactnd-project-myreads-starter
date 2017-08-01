/**
 * Created by hawaijar on 7/4/17.
 */
import React from 'react';
import BookShelf from './BookShelf';
import * as Constants from '../constant';
import '../App.css';

const MyLibrary = props => {
  const { books, updateBook } = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            shelf={Constants.categories.CURRENT[1]}
            books={books.filter(
              book => book.shelf === Constants.categories.CURRENT[0],
            )}
            updateBook={updateBook}
          />

          <BookShelf
            shelf={Constants.categories.WISH[1]}
            books={books.filter(
              book => book.shelf === Constants.categories.WISH[0],
            )}
            updateBook={updateBook}
          />

          <BookShelf
            shelf={Constants.categories.READ[1]}
            books={books.filter(
              book => book.shelf === Constants.categories.READ[0],
            )}
            updateBook={updateBook}
          />
          <BookShelf
            shelf={Constants.categories.NONE[1]}
            books={books.filter(
              book => book.shelf === Constants.categories.NONE[0],
            )}
            updateBook={updateBook}
          />
        </div>
      </div>
    </div>
  );
};

export default MyLibrary;

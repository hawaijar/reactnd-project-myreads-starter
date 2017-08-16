/**
 * Created by hawaijar on 7/4/17.
 */
import React from 'react';
import BookShelf from './BookShelf';
import * as Constants from '../constant';
import '../App.css';

class MyLibrary extends React.Component {
  createBooks = (books: Array<BookType>, targetShelf: string) => {
    return books.filter((book: BookType) => book.shelf === targetShelf);
  };

  render() {
    const { books, updateBook } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              shelf={Constants.categories.CURRENT[1]}
              books={this.createBooks(books, Constants.categories.CURRENT[0])}
              updateBook={updateBook}
            />

            <BookShelf
              shelf={Constants.categories.WISH[1]}
              books={this.createBooks(books, Constants.categories.WISH[0])}
              updateBook={updateBook}
            />

            <BookShelf
              shelf={Constants.categories.READ[1]}
              books={this.createBooks(books, Constants.categories.READ[0])}
              updateBook={updateBook}
            />
            <BookShelf
              shelf={Constants.categories.NONE[1]}
              books={this.createBooks(books, Constants.categories.NONE[0])}
              updateBook={updateBook}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MyLibrary;

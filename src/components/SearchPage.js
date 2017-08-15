// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Throttle } from 'react-throttle';
import * as Constants from '../constant';
import Book from './Book';
import Spinner from './Spinner';

export default class SearchBook extends React.Component {
  state = {
    isLoading: false,
  };

  updateQuery = (e: SyntheticKeyboardEvent & { target: HTMLInputElement }) => {
    this.setState({
      isLoading: true,
    });
    this.props.updateSearchTerm(e.target.value);
  };

  createMatchedBook = (book: BookType, index: number) => {
    const updateBook = this.props.updateBook;

    if (book.shelf === Constants.categories.CURRENT[0]) {
      return (
        <li key={index}>
          <Book
            book={book}
            updateBook={updateBook}
            shelf={Constants.categories.CURRENT[1]}
          />
        </li>
      );
    } else if (book.shelf === Constants.categories.WISH[0]) {
      return (
        <li key={index}>
          <Book
            book={book}
            updateBook={updateBook}
            shelf={Constants.categories.WISH[1]}
          />
        </li>
      );
    } else if (book.shelf === Constants.categories.READ[0]) {
      return (
        <li key={index}>
          <Book
            book={book}
            updateBook={updateBook}
            shelf={Constants.categories.READ[1]}
          />
        </li>
      );
    } else if (book.shelf === Constants.categories.NONE[0]) {
      return (
        <li key={index}>
          <Book
            book={book}
            updateBook={updateBook}
            shelf={Constants.categories.NONE[1]}
          />
        </li>
      );
    }
  };

  reset = () => {
    this.props.clearSearchTerm();
  };
  autoFocus = (e: SyntheticEvent & { target: { value: string } }) => {
    let val = e.target.value;
    e.target.value = '';
    e.target.value = val;
  };

  render() {
    const queryResult = this.props.queryResult;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" onClick={this.reset}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <Throttle time="200" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.props.searchTerm}
                autoFocus
                onFocus={this.autoFocus}
                onChange={this.updateQuery}
              />
            </Throttle>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchLoading
              ? <Spinner />
              : queryResult.map(this.createMatchedBook)}
          </ol>
        </div>
      </div>
    );
  }
}

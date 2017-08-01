/**
 * Created by hawaijar on 7/5/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Throttle } from 'react-throttle';
import categories from '../constant/index';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';

export default class SearchBook extends Component {
  static propTypes = {
    moveFromCurrentList: PropTypes.func,
    moveFromWishList: PropTypes.func,
    moveFromReadList: PropTypes.func,
    addToLibrary: PropTypes.func,
  };
  state = {
    library: this.props.library,
    queryResult: [],
  };
  createMatchedBook = (book, index) => {
    book.authors = book.authors || [];

    if (book.shelf === categories.CURRENT[0]) {
      return (
        <li key={index}>
          <Book
            book={book}
            moveBookToAnotherShelf={this.props.moveFromCurrentList}
            shelf={categories.CURRENT[1]}
          />
        </li>
      );
    } else if (book.shelf === categories.WISH[0]) {
      return (
        <li key={index}>
          <Book
            book={book}
            moveBookToAnotherShelf={this.props.moveFromWishList}
            shelf={categories.WISH[1]}
          />
        </li>
      );
    } else if (book.shelf === categories.READ[0]) {
      return (
        <li key={index}>
          <Book
            book={book}
            moveBookToAnotherShelf={this.props.moveFromReadList}
            shelf={categories.READ[1]}
          />
        </li>
      );
    } else if (book.shelf === categories.NONE[0]) {
      return (
        <li key={index}>
          <Book
            book={book}
            moveBookToAnotherShelf={this.props.addToLibrary}
            shelf={categories.NONE[1]}
          />
        </li>
      );
    }
  };

  sync = (queryResult, library) => {
    _.each(queryResult, function(book) {
      let matchedBookFromLibrary = _.find(library, { id: book.id });
      if (matchedBookFromLibrary !== undefined) {
        book.shelf = categories.map[matchedBookFromLibrary.shelf];
      }
    });
    return queryResult;
  };

  updateQuery = event => {
    const query = event.target.value;
    if (query === '') {
      this.setState({
        queryResult: [],
      });
      return;
    }
    BooksAPI.search(query, 20)
      .then(books => {
        if (books === undefined || books.error === 'empty query') {
          this.setState({
            queryResult: [],
          });
          return;
        }

        books = _.reduce(
          books,
          function(result, book) {
            book.imageLinks = book.imageLinks || { thumbnail: '' };
            result.push({
              id: book.id,
              imageLinks: book.imageLinks,
              title: book.title,
              authors: book.authors,
              shelf: book.shelf,
            });
            return result;
          },
          [],
        );

        // remove (any) duplicate books (by 'title')
        books = _.uniqBy(books, 'title');
        books = this.sync(books, this.state.library);
        this.setState({
          queryResult: books,
        });
      })
      .catch(err => {
        this.setState({
          queryResult: [],
        });
        console.log(err);
      });
  };
  componentWillReceiveProps(nextProps) {
    let queryResult = this.state.queryResult;
    queryResult = this.sync(queryResult, nextProps.library);
    this.setState({
      queryResult,
    });
  }

  render() {
    const { query } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <Throttle time="200" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={this.updateQuery}
              />
            </Throttle>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {query !== '' && this.state.queryResult.map(this.createMatchedBook)}
          </ol>
        </div>
      </div>
    );
  }
}

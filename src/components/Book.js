/**
 * Created by hawaijar on 7/4/17.
 */
// @flow

import React, { Component } from 'react';
import { string, object } from 'prop-types';
import * as Constants from '../constant/index';

export default class Book extends Component {
  static propTypes = {
    shelf: string.isRequired,
    book: object.isRequired,
  };

  state = {
    book: {},
    selectedBookId: '',
  };

  componentWillReceiveProps(nextProps: any) {
    this.setState({
      book: nextProps.book,
    });
  }

  render() {
    const book = this.props.book;
    const { title, authors, imageLinks } = book;
    let { shelf, updateBook } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imageLinks.thumbnail}`,
            }}
          >
            {true}
          </div>
          <div className="book-shelf-changer">
            <select
              value={shelf}
              onChange={e => {
                const value = e.target.value;
                if (value !== shelf) {
                  book.shelf = Constants.categories.map[value];
                  updateBook(book);
                }
              }}
            >
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
          {title}
        </div>
        {authors.map(author =>
          <div key={author} className="book-authors">
            {author}
          </div>,
        )}
      </div>
    );
  }
}

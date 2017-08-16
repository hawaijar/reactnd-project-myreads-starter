import React, { Component } from 'react';
import reduce from 'lodash/reduce';
import uniqBy from 'lodash/uniqBy';
import each from 'lodash/each';
import find from 'lodash/find';
import * as BooksAPI from '../BooksAPI';
import * as Constants from '../constant';
import Spinner from './Spinner';

const DataFetcher = Wrapped => {
  class DataFetcherComponent extends Component {
    constructor(props) {
      super(props);
      this.mounted = false;
      this.state = {
        isError: false,
        error: null,
        queryResult: []
      };
      this.sync = this.sync.bind(this);
    }

    sync(storeBooks, searchResultBooks) {
      each(searchResultBooks, function(book) {
        let matchedBookFromLibrary = find(storeBooks, { id: book.id });
        if (matchedBookFromLibrary !== undefined) {
          book.shelf = matchedBookFromLibrary.shelf;
        }
      });
      return searchResultBooks;
    }

    componentDidMount() {
      this.mounted = true;
      const { action, updateState, isRefresh } = this.props;
      switch (action) {
        case Constants.fetchActions.FETCH: {
          if (!isRefresh) {
            BooksAPI.getAll()
              .then(data => {
                if (data) {
                  data = reduce(
                    data,
                    function(result, book) {
                      book.imageLinks = book.imageLinks || { thumbnail: '' };
                      book.authors = book.authors || [];
                      book.shelf = book.shelf || 'none';
                      result.push({
                        id: book.id,
                        imageLinks: book.imageLinks,
                        title: book.title,
                        authors: book.authors,
                        shelf: book.shelf || 'None'
                      });
                      return result;
                    },
                    []
                  );

                  updateState({
                    books: data,
                    isRefresh: true
                  });
                }
              })
              .catch(err => {
                console.log(err); /* eslint-disable no-console */
                this.setState({
                  isError: true,
                  error: err
                });
              });
          }
          break;
        }
        case Constants.fetchActions.SEARCH: {
          const { searchTerm, searchLoading, updateStateFromSearch } = this.props;
          if (searchLoading) {
            if (searchTerm === '') {
              return;
            }
            BooksAPI.search(searchTerm, 20)
              .then(books => {
                if (books === undefined || books.error === 'empty query') {
                  this.setState({
                    queryResult: []
                  });
                  return;
                }

                books = reduce(
                  books,
                  function(result, book) {
                    book.imageLinks = book.imageLinks || { thumbnail: '' };
                    book.authors = book.authors || [];
                    book.shelf = book.shelf || 'none';
                    result.push({
                      id: book.id,
                      imageLinks: book.imageLinks,
                      title: book.title,
                      authors: book.authors,
                      shelf: book.shelf
                    });
                    return result;
                  },
                  []
                );

                // remove (any) duplicate books (by 'title')
                books = uniqBy(books, 'title');
                // sync the latest status from the store (single source of truth)
                if (this.props.books.length > 0) {
                  books = this.sync(this.props.books, books);
                }
                if (this.mounted) {
                  updateStateFromSearch({
                    queryResult: books,
                    searchLoading: false
                  });
                }
              })
              .catch(err => {
                this.setState({
                  queryResult: []
                });
                console.log(err);
              });
          }

          break;
        }
        default:
          break;
      }
    }

    render() {
      let component;
      if (!this.props.isRefresh && !this.props.isSearch) {
        component = <Spinner />;
      } else if (this.state.isError) {
        return (
          <span>
            Error: {this.state.error}
          </span>
        );
      } else {
        if (this.props.isSearch) {
          component = (
            <Wrapped
              updateSearchTerm={this.props.updateSearchTerm}
              clearSearchTerm={this.props.clearSearchTerm}
              updateBook={this.props.updateBook}
              searchTerm={this.props.searchTerm}
              searchLoading={this.props.searchLoading}
              queryResult={this.props.queryResult}
            />
          );
        } else {
          component = <Wrapped books={this.props.books} updateBook={this.props.updateBook} />;
        }
      }
      return component;
    }

    componentWillUnmount() {
      this.mounted = false;
    }
  }

  return DataFetcherComponent;
};

export default DataFetcher;

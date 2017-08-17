import React, { Component } from 'react';
import reduce from 'lodash/reduce';
import uniqBy from 'lodash/uniqBy';
import each from 'lodash/each';
import find from 'lodash/find';
import { string, boolean, Function, shape, arrayOf } from 'prop-types';
import * as BooksAPI from '../BooksAPI';
import * as Constants from '../constant';
import Spinner from './Spinner';

const DataFetcher = Wrapped => {
  class DataFetcherComponent extends Component {
    static propTypes = {
      action: string,
      isRefresh: boolean,
      updateState: Function,
      searchTerm: string,
      searchLoading: string,
      updateStateFromSearch: Function,
      books: arrayOf(
        shape({
          id: string,
          imageLinks: shape({
            thmubnail: string
          }),
          title: string,
          authors: arrayOf(string),
          shelf: string
        })
      )
    };

    static defaultProps = {
      action: Constants.fetchActions.FETCH,
      isRefresh: true,
      updateState: f => f,
      searchTerm: '',
      searchLoading: false,
      updateStateFromSearch: f => f,
      books: []
    };

    state = {
      isError: false,
      error: null,
      queryResult: []
    };

    componentDidMount() {
      this.mounted = true;
      const { action, updateState, isRefresh } = this.props;
      switch (action) {
        case Constants.fetchActions.FETCH: {
          if (!isRefresh) {
            BooksAPI.getAll()
              .then(data => {
                /* eslint-disable no-param-reassign */
                if (data) {
                  data = reduce(
                    data,
                    (result, book) => {
                      const objPropperties = {
                        imageLinks: book.imageLinks || { thumbnail: '' },
                        authors: book.authors || [],
                        shelf: book.shelf || 'none'
                      };
                      const newBook = { ...book, objPropperties };
                      result.push({
                        id: newBook.id,
                        imageLinks: newBook.imageLinks,
                        title: newBook.title,
                        authors: newBook.authors,
                        shelf: newBook.shelf || 'None'
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
                /* eslint-disable no-console */
                console.log(err);
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
                  (result, book) => {
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
    mounted = false;
    sync = (storeBooks, searchResultBooks) => {
      each(searchResultBooks, function(book) {
        let matchedBookFromLibrary = find(storeBooks, { id: book.id });
        if (matchedBookFromLibrary !== undefined) {
          book.shelf = matchedBookFromLibrary.shelf;
        }
      });
      return searchResultBooks;
    };
  }

  return DataFetcherComponent;
};

export default DataFetcher;

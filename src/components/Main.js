// @flow
type State = {
  books: Array<BookType>,
  queryResult: Array<BookType>,
  searchTerm: string,
  isRefresh: boolean,
  searchLoading: boolean,
};

import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import findIndex from 'lodash/findIndex';
import MyLibrary from './MyLibrary';
import SearchPage from './SearchPage';
import DataFetcher from './DataFetcher';
import * as Constants from '../constant';
import { update } from '../BooksAPI';

/* For performance testing
import Perf from 'react-addons-perf'
window.Perf = Perf;
Perf.start();
*/

class Main extends React.Component {
  state = {
    // this is the single source of info (all books and their status)
    // from which the state of books displayed in the child components - Main and Search
    // shall depend on. Any events happened on child components shall update this global state.
    books: [],
    queryResult: [],
    searchTerm: '',
    isRefresh: false,
    searchLoading: false,
  };

  updateState = (state: State) => {
    this.setState({
      books: state.books,
      isRefresh: state.isRefresh,
    });
  };

  updateStateFromSearch = (state: State) => {
    this.setState({
      queryResult: state.queryResult,
      searchLoading: state.searchLoading,
    });
  };

  updateBook = (book: BookType) => {
    let books = this.state.books;
    let index = findIndex(this.state.books, { id: book.id });
    if (index !== -1) {
      books.splice(index, 1, book);
    } else {
      // coming from Search Component?
      // add the book to the list
      books = [...books, book];
    }
    // update the server
    update(book, book.shelf);
    // update the state
    this.setState({
      books,
      searchLoading: false,
    });
  };

  updateSearchTerm = (term: string) => {
    this.setState({
      searchTerm: term,
      searchLoading: true,
    });
  };

  clearSearchTerm() {
    this.setState({
      searchTerm: '',
      searchLoading: false,
    });
  }

  resetSearch = () => {
    this.setState({
      queryResult: [],
      searchLoading: false,
    });
  };

  render() {
    //const FourOhFour = () => <h1>404 - path not found</h1>;
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              // Use the DataFetcher(hoc) to delegate the async operations
              let MainPageComponent = DataFetcher(MyLibrary);
              return (
                <div className="data-component">
                  <MainPageComponent
                    {...this.state}
                    updateState={this.updateState}
                    updateBook={this.updateBook}
                    action={Constants.fetchActions.FETCH}
                  />
                  <div className="open-search">
                    <Link to="/search" onClick={this.resetSearch}>
                      Close
                    </Link>
                  </div>
                </div>
              );
            }}
          />

          <Route
            path="/search"
            render={() => {
              let SearchComponent = DataFetcher(SearchPage);
              return (
                <SearchComponent
                  queryResult={this.state.queryResult}
                  isSearch={true}
                  action={Constants.fetchActions.SEARCH}
                  searchTerm={this.state.searchTerm}
                  updateSearchTerm={this.updateSearchTerm}
                  clearSearchTerm={this.clearSearchTerm}
                  updateBook={this.updateBook}
                  updateStateFromSearch={this.updateStateFromSearch}
                  searchLoading={this.state.searchLoading}
                  books={this.state.books}
                />
              );
            }}
          />
          {/*<Route component={FourOhFour} /> */}
          {/* Redirect to home page for any non-matching paths */}
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default Main;

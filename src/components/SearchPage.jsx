import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { object } from 'prop-types';
import { getSearchDataFromAPI, updateCurrentPagePath } from '../actions';
import Book from './Book';
import Spinner from './Spinner';
import '../App.scss';

class SearchPage extends Component {
  constructor(props) {
    super(props);
  }
  // handler = () => {
  //   /* eslint-disable no-console */
  //   console.log('5', this.context.store.getState());
  // };
  state = {
    searchTerm: ''
  };
  createBooks = books => {
    const setBooks = books.map(book => {
      return (
        <li key={book.title}>
          <Book path={this.props.match.url} book={book} />
        </li>
      );
    });
    return setBooks;
  };
  updateQuery = e => {
    const val = e.target.value;
    this.setState({
      searchTerm: val
    });
    this.props.dispatchInputChange(val);
  };
  reset = () => {
    this.props.dispatchInputChange('');
    this.props.updatePath('/');
  };
  // componentDidMount() {
  //   this.context.store.subscribe(this.handler);
  // }
  render() {
    const { books, isSearchPageLoading, hasErroredSearchPage } = this.props;
    let component;
    if (hasErroredSearchPage) {
      component = (
        <div>
          <p>
            Your search - <strong>{this.state.searchTerm}</strong> - did not match any books{' '}
          </p>
        </div>
      );
    } else if (isSearchPageLoading) {
      component = <Spinner />;
    } else {
      component = (
        <ol className="books-grid">
          {this.createBooks(books)}
        </ol>
      );
    }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" onClick={this.reset}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searchTerm}
              autoFocus
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          {component}
        </div>
      </div>
    );
  }
}
// SearchPage.contextTypes = {
//   store: object
// };

const mapStateToProps = state => {
  return {
    books: Object.values(state.searchPageBooks),
    isSearchPageLoading: state.isSearchPageLoading,
    hasErroredSearchPage: state.hasErroredSearchPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchInputChange(query) {
      dispatch(getSearchDataFromAPI(query));
    },
    updatePath(path) {
      dispatch(updateCurrentPagePath(path));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

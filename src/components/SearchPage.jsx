import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateSearchTerm, getSearchData } from '../actions';
import Book from './Book';
import Spinner from './Spinner';
import '../App.scss';

class SearchPage extends Component {
  state = {
    searchTerm: ''
  };
  createBooks = books => {
    const setBooks = books.map(book => {
      return (
        <li key={book.title}>
          <Book book={book} />
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
  };
  render() {
    const { books, isLoadingSearchPage } = this.props;
    let component;
    if (isLoadingSearchPage) {
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

const mapStateToProps = state => {
  return {
    books: Object.values(state.searchPageBooks),
    isLoadingSearchPage: state.isLoadingSearchPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchInputChange(query) {
      dispatch(getSearchData(query));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

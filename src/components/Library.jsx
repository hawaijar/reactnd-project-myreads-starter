import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import Spinner from './Spinner';
import * as Constants from '../constant';
import { getBooksFromAPI } from '../actions';
import '../App.scss';

class Library extends Component {
  createBooks = (books, targetShelf) => {
    return books.filter(book => book.shelf === targetShelf);
  };
  componentDidMount() {
    /* eslint-disable no-console */
    console.log(this.props.books);
    if (this.props.books.length === 0) {
      this.props.populateBooks();
    }
  }
  render() {
    const { books } = this.props;
    let component;
    if (this.props.hasErroredMainPage) {
      component = (
        <div>
          <h2>Error in fetching data from the API</h2>
          <pre>
            <code>
              {JSON.stringify(this.props.hasErrorMainPage.errorMsg, null, 2)}
            </code>
          </pre>
        </div>
      );
    } else if (this.props.isMainPageLoading) {
      component = <Spinner />;
    } else {
      component = (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf shelf={Constants.categories.CURRENT[1]}>
                {this.createBooks(books, Constants.categories.CURRENT[1])}
              </BookShelf>
              <BookShelf shelf={Constants.categories.WISH[1]}>
                {this.createBooks(books, Constants.categories.WISH[1])}
              </BookShelf>
              <BookShelf shelf={Constants.categories.READ[1]}>
                {this.createBooks(books, Constants.categories.READ[1])}
              </BookShelf>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Close</Link>
          </div>
        </div>
      );
    }

    return component;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    books: Object.values(state.mainPageBooks),
    isMainPageLoading: state.isMainPageLoading,
    hasErroredMainPage: state.hasErroredMainPage
  };
}
function mapDispatchToProps(dispatch) {
  return {
    populateBooks() {
      dispatch(getBooksFromAPI());
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Library);

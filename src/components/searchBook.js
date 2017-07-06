/**
 * Created by hawaijar on 7/5/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import categories from '../constant/bookTitles';
import Book from './book';

export default class SearchBook extends Component {
    static propTypes = {
        moveFromCurrentList: PropTypes.func,
        moveFromWishList: PropTypes.func,
        moveFromReadList: PropTypes.func,
    };
    state = {
        query: '',
        books: []
    };
    createMatchedBook = (book) => {
        if (book.shelf === categories.CURRENT[0]) {
            return (
                <li key={ book.title }>
                    <Book
                        book={ book }
                        moveBookToAnotherShelf={ this.props.moveFromCurrentList }
                        shelf={ categories.CURRENT[1] }
                    />
                </li>
            )
        }
        else if (book.shelf === categories.WISH[0]) {
            return (
                <li key={ book.title }>
                    <Book
                        book={ book }
                        moveBookToAnotherShelf={ this.props.moveFromWishList }
                        shelf={ categories.WISH[1] }
                    />
                </li>
            )
        }
        else {
            return (
                <li key={ book.title }>
                    <Book
                        book={ book }
                        moveBookToAnotherShelf={ this.props.moveFromReadList }
                        shelf={ categories.WISH[1] }
                    />
                </li>
            )
        }
    };


    updateQuery = (query) => {
        let matchedBooks = []
        const match = new RegExp(escapeRegExp(query), 'i');
        const books = []; // get from BooksAPI
        matchedBooks = books.filter((book) => match.test(book.title))
            .map(this.createMatchedBook);
        this.setState({
            query,
            books: matchedBooks
        })


    };

    render() {
        const {query} = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={ query }
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {query !== '' && this.state.books}
                    </ol>
                </div>
            </div>
        )
    }
}

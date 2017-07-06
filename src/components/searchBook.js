/**
 * Created by hawaijar on 7/5/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import categories from '../constant/bookTitles';
import Book from './book';
import * as BooksAPI from '../BooksAPI';

export default class SearchBook extends Component {
    static propTypes = {
        moveFromCurrentList: PropTypes.func,
        moveFromWishList: PropTypes.func,
        moveFromReadList: PropTypes.func,
        moveFromNone: PropTypes.func
    };
    state = {
        query: '',
        books: []
    };
    createMatchedBook = (book, index) => {
        book.authors = book.authors || [];
        book.backgroundImage = book.imageLinks.thumbnail;
        if (book.shelf === categories.CURRENT[0]) {
            return (
                <li key={ index }>
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
                <li key={ index }>
                    <Book
                        book={ book }
                        moveBookToAnotherShelf={ this.props.moveFromWishList }
                        shelf={ categories.WISH[1] }
                    />
                </li>
            )
        }
        else if (book.shelf === categories.READ[0]){
            return (
                <li key={ index }>
                    <Book
                        book={ book }
                        moveBookToAnotherShelf={ this.props.moveFromReadList }
                        shelf={ categories.READ[1] }
                    />
                </li>
            )
        }
        else if (book.shelf === categories.NONE[0]){
            return (
                <li key={ index }>
                    <Book
                        book={ book }
                        moveBookToAnotherShelf={ this.props.moveFromNone }
                        shelf={ categories.NONE[1] }
                    />
                </li>
            )
        }
    };


    updateQuery = (event) => {
        let matchedBooks;
        const query = event.target.value;
        this.setState({
            query,
        });

        if(query === ''){
            return;
        }

        BooksAPI.search(query, 20)
            .then(books => {
                books = books || [];
                matchedBooks = books.map(this.createMatchedBook);
                this.setState({
                    books: matchedBooks
                })
            });
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
                                onChange={this.updateQuery}
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
    componentDidMount() {
        //BooksAPI.search('Satire', 20)
          //  .then(books => console.log(books));
    }
}

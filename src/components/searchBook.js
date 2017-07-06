/**
 * Created by hawaijar on 7/5/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import _ from 'lodash';
import { Throttle } from 'react-throttle';
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
        library: this.props.library,
        queryResult: [],

    };
    createMatchedBook = (book, index) => {
        book.authors = book.authors || [];
        if(book.imageLinks) {
            book.backgroundImage = book.imageLinks.thumbnail
        }
        else {
            book.backgroundImage = '';
        }
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

    sync = (queryResult , library) => {
        _.forEach(queryResult, function(book) {
            let matchedBookFromLibrary = _.find(library, {'id': book.id});
            if (matchedBookFromLibrary !== undefined) {
                book.shelf = matchedBookFromLibrary.shelf;
            }
        });
        return queryResult;

    };

    updateQuery = (event) => {
        const query = event.target.value;
        BooksAPI.search(query, 20)
            .then(books => {
                books = books || [];
                books = this.sync(books, this.state.library);
                this.setState({
                    queryResult: books
                })
            })
            .catch(err => {
                this.setState({
                    queryResult: []
                });
                console.log(err)
            });
    };
    componentWillReceiveProps(nextProps) {
        let queryResult = this.state.queryResult;
        queryResult = this.sync(queryResult, nextProps.library);
        this.setState({
            queryResult
        })
    }

    render() {
        const {query} = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
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
        )
    }

}

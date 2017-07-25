import React, {Component} from 'react';
import _ from 'lodash';
import * as BooksAPI from '../BooksAPI'
import * as Constants from '../constant';
import Spinner from './Spinner';

const DataFetcher = Wrapped => {
    class DataFetcher extends Component {
        state = {
            isError: false
        };
        reconcile = (oldBooks, newBooks) => {
            _.each(newBooks, (newBook) => {
                // check if the newBook is already there. Update its latest status if required to.
                let matchedBook = _.find(oldBooks, {'id': newBook.id});
                if (!matchedBook) {
                    newBook.status = matchedBook.status;
                }
            });
            return newBooks;
        };

        componentDidMount() {
            const {books, action, updateState, isRefresh} = this.props;
            switch (action) {
                case Constants.fetchActions.FETCH: {
                    if (!isRefresh) {
                        BooksAPI.getAll()
                            .then(data => {
                                if (data) {
                                    data = _.reduce(data, function (result, book) {
                                        book.imageLinks = book.imageLinks || {thumbnail: ''};
                                        result.push({
                                            id: book.id,
                                            imageLinks: book.imageLinks,
                                            title: book.title,
                                            authors: book.authors,
                                            shelf: book.shelf
                                        });
                                        return result;
                                    }, []);

                                    // reconcile old(this.props.books) & new list of books
                                    if (books.length > 0) {
                                        data = this.reconcile(books, data);
                                    }
                                    updateState({
                                        books: data,
                                        isRefresh: true
                                    })
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                this.setState({
                                    books: [],
                                    error: err
                                })
                            });
                    }
                    break;
                }
                case Constants.fetchActions.SEARCH: {
                    break;
                }
                default:
                    break;
            }
        }

        render() {
            let component;
            if (!this.props.isRefresh) {
                component = <Spinner/>
            }
            else if (this.state.isError) {
                return <span>Error: {this.state.error}</span>;
            }
            else {
                component = <Wrapped {...this.props}/>
            }
            return component;
        }
    }

    return DataFetcher;

};

export default DataFetcher;

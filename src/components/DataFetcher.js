import React, {Component} from 'react';
import _ from 'lodash';
import * as BooksAPI from '../BooksAPI'
import * as Constants from '../constant';

const DataFetcher = Wrapped => class DataFetcher extends Component {
    state = {
        loading: true,
        error: null,
        books: null
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
        const { books, action, populateBooks } = this.props;
        switch (action) {
            case Constants.fetchActions.FETCH: {
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
                            if(books.length > 0) {
                                data = this.reconcile(books, data);
                            }
                            else{
                                populateBooks(data);
                            }

                            this.setState({
                                loading: false,
                                books: data
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.setState({
                            books: []
                        })
                    });
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

        if (this.state.loading) {
            component = <div>Loading...</div>
        }
        else if (this.state.error !== null) {
            return <span>Error: {this.state.error.message}</span>;
        }
        else {
            component = <Wrapped {...this.state} />
        }
        return component;
    }

};

export default DataFetcher;

import React, {Component} from 'react';
import reduce from 'lodash/reduce';
import uniqBy from 'lodash/uniqBy';
import * as BooksAPI from '../BooksAPI'
import * as Constants from '../constant';
import Spinner from './Spinner';


const DataFetcher = Wrapped => {
    class DataFetcher extends Component {
        state = {
            isError: false,
            error: null,
            queryResult: []
        };


        componentDidMount() {
            this.mounted = true;
            const {action, updateState, isRefresh} = this.props;
            switch (action) {
                case Constants.fetchActions.FETCH: {
                    if (!isRefresh) {
                        BooksAPI.getAll()
                            .then(data => {
                                if (data) {
                                    data = reduce(data, function (result, book) {
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

                                    updateState({
                                        books: data,
                                        isRefresh: true
                                    })
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                this.setState({
                                    isError: true,
                                    error: err
                                })
                            });
                    }
                    break;
                }
                case Constants.fetchActions.SEARCH: {
                    const { searchTerm } = this.props;
                    if(searchTerm === ''){
                        return;
                    }
                    BooksAPI.search(searchTerm, 20)
                        .then(books => {
                            if(books === undefined || (books.error === 'empty query') ){
                                this.setState({
                                    queryResult: []
                                });
                                return;
                            }

                            books = reduce(books, function(result, book){
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

                            // remove (any) duplicate books (by 'title')
                            books = uniqBy(books, 'title');
                            //books = this.sync(books, this.state.library);
                            if(this.mounted) {
                                this.setState({
                                    queryResult: books
                                })
                            }
                        })
                        .catch(err => {
                            this.setState({
                                queryResult: []
                            });
                            console.log(err)
                        });

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
                if(this.props.isSearch){
                    component = <Wrapped
                        updateSearchTerm={this.props.updateSearchTerm}
                        searchTerm={this.props.searchTerm}
                        queryResult={this.state.queryResult} />
                }
                else {
                    component = <Wrapped {...this.props}/>
                }
            }
            return component;
        }
        componentWillUnmount(){
            this.mounted = false;
        }
    }

    return DataFetcher;

};

export default DataFetcher;

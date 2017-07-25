import React from 'react'
import {Route} from 'react-router-dom';
import findIndex from 'lodash/findIndex'
import MyLibrary from './myLibrary';
import SearchPage from './SearchPage';
import DataFetcher from './DataFetcher';
import * as Constants from '../constant';

class Main extends React.Component {
    state = {
        // this is the single source of info (all books and their status)
        // from which the state of books displayed in the child components - Main and Search
        // shall depend on. Any events happened on child components shall update this global state.
        books: [],
        isRefresh: false
    };
    constructor() {
        super();
        this.updateState = this.updateState.bind(this);
        this.updateBook = this.updateBook.bind(this);
    }

    updateState(state) {
        this.setState({
            books: state.books,
            isRefresh: state.isRefresh
        });
    }
    updateBook(book) {

        let index = findIndex(this.state.books, {id: book.id});
        let books = this.state.books;
        books.splice(index, 1, book);
        this.setState({books});
    }

    render() {
        return (
            <div>
                <Route exact path='/' render={
                    () => {
                        // Use the DataFetcher hoc to delegate the async operations
                        let MainPageComponent = DataFetcher(MyLibrary);
                        return (
                            <div className="data-component">
                                <MainPageComponent
                                    {...this.state}
                                    updateState={this.updateState}
                                    updateBook={this.updateBook}
                                    action={Constants.fetchActions.FETCH}/>
                            </div>
                        );
                    }
                }/>

                <Route path='/search' render={(props) => (
                    <SearchPage/>
                )}/>
            </div>
        )
    }
}

export default Main;

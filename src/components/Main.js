import React from 'react'
import { Route } from 'react-router-dom';
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import DataFetcher from './DataFetcher';
import * as Constants from '../constant';

class Main extends React.Component {


    constructor() {
        super();

        // this is the single source of info (all books and their status)
        // from which the state of books displayed in the child components - Main and Search
        // shall depend on. Any events happened on child components shall update this global state.
        this.store = {
            books: []
        };
        this.populateBooks = this.populateBooks.bind(this);
    }
    populateBooks(books) {
        this.allBooks = books;
    }
    render() {
        return (
            <div>
                <Route exact path='/' render={
                    () => {
                        let MainPageComponent = DataFetcher(MainPage);

                        return (
                            <div className="data-component">
                                <MainPageComponent
                                    books={this.store.books}
                                    populateBooks={this.populateBooks}
                                    action={Constants.fetchActions.FETCH} />
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

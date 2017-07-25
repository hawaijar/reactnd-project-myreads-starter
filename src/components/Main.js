import React from 'react'
import {Route} from 'react-router-dom';
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
    }

    updateState(state) {
        this.setState({
            books: state.books,
            isRefresh: state.isRefresh
        });
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

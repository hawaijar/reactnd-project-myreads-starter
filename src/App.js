import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {currentList, wishList, readList} from './test/bookData'
import BookShelf from './components/bookShelf';
import categories from './constant/bookTitles';

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        currentList,
        wishList,
        readList,
        showSearchPage: false
    };

    constructor() {
        super();
        this.moveFromCurrentList = this.moveFromCurrentList.bind(this);
        this.moveFromWishList = this.moveFromWishList.bind(this);
        this.moveFromReadList = this.moveFromReadList.bind(this);
    }
    moveFromCurrentList(book, toShelf) {
        const title = book.title;
        this.setState(prevState => {
            let newWishList = prevState.wishList;
            let newReadList = prevState.readList;
            if (toShelf === categories.WISH[1]) {
                book.shelf = categories.WISH[0];
                newWishList.books = [...newWishList.books, book];
            }
            else {
                book.shelf = categories.READ[0];
                newReadList.books = [...newReadList.books, book];
            }
            let newCurrentListBooks = prevState.currentList.books.filter(book => book.title !== title);
            let newCurrentList = prevState.currentList;
            newCurrentList.books = newCurrentListBooks;
            return ({
                currentList: newCurrentList,
                wishList: newWishList,
                readList: newReadList,
                books: [...newCurrentList.books, ...newWishList.books, ...newReadList.books]
            })
        });
    }

    moveFromWishList(book, toShelf) {
        const title = book.title;
        this.setState(prevState => {
            let newCurrentList = prevState.currentList;
            let newReadList = prevState.readList;
            if (toShelf === categories.READ[1]) {
                book.shelf = categories.READ[0];
                newReadList.books = [...newReadList.books, book];
            }
            else {
                book.shelf = categories.CURRENT[0];
                newCurrentList.books = [...newCurrentList.books, book];
            }
            let newWishListBooks = prevState.wishList.books.filter(book => book.title !== title);
            let newWishList = prevState.wishList;
            newWishList.books = newWishListBooks;
            return ({
                currentList: newCurrentList,
                wishList: newWishList,
                readList: newReadList,
                books: [...newCurrentList.books, ...newWishList.books, ...newReadList.books]
            })
        });
    }

    moveFromReadList(book, toShelf) {
        const title = book.title;
        this.setState(prevState => {
            let newCurrentList = prevState.currentList;
            let newWishList = prevState.wishList;
            if (toShelf === categories.WISH[1]) {
                book.shelf = categories.WISH[0];
                newWishList.books = [...newWishList.books, book];
            }
            else {
                book.shelf = categories.CURRENT[0];
                newCurrentList.books = [...newCurrentList.books, book];
            }
            let newReadListBooks = prevState.readList.books.filter(book => book.title !== title);
            let newReadList = prevState.readList;
            newReadList.books = newReadListBooks;
            return ({
                currentList: newCurrentList,
                wishList: newWishList,
                readList: newReadList,
                books: [...newCurrentList.books, ...newWishList.books, ...newReadList.books]
            })
        });
    }

    render() {
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <a className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</a>
                            <div className="search-books-input-wrapper">
                                <input type="text" placeholder="Search by title or author"/>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid">{true}</ol>
                        </div>
                    </div>
                ) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookShelf
                                    shelf={ this.state.currentList.shelf }
                                    books={ this.state.currentList.books }
                                    moveBookToAnotherShelf={ this.moveFromCurrentList }
                                />
                                <BookShelf
                                    shelf={ this.state.wishList.shelf }
                                    books={ this.state.wishList.books }
                                    moveBookToAnotherShelf={ this.moveFromWishList }
                                />
                                <BookShelf
                                    shelf={ this.state.readList.shelf }
                                    books={ this.state.readList.books }
                                    moveBookToAnotherShelf={ this.moveFromReadList }
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default BooksApp;

import React from 'react'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import _ from 'lodash'
import * as BooksAPI from './BooksAPI'
import './App.css'
//import {currentList, wishList, readList} from './test/bookData'
import categories from './constant/bookTitles';
import MyLibrary from './components/myLibrary';
import SearchBook from './components/searchBook';

class BooksApp extends React.Component {
    state = {
        currentList: [],
        wishList: [],
        readList: [],
        noneList: {
            books: [],
            shelf: categories.NONE[1]
        },
        books: [],
        isLoading: false,
    };

    constructor() {
        super();
        this.moveFromCurrentList = this.moveFromCurrentList.bind(this);
        this.moveFromWishList = this.moveFromWishList.bind(this);
        this.moveFromReadList = this.moveFromReadList.bind(this);
        this.addToLibrary = this.addToLibrary.bind(this);
    }
    componentDidMount(){
        BooksAPI.getAll()
            .then(books => {
                if(books){
                    books = _.reduce(books, function(result, book){
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
                    let newCurrentList = {};
                    newCurrentList.books = books.filter(book => book.shelf === categories.CURRENT[0]);
                    newCurrentList.shelf = categories.CURRENT[1];

                    let newWishList = {};
                    newWishList.books = books.filter(book => book.shelf === categories.WISH[0]);
                    newWishList.shelf = categories.WISH[1];

                    let newReadList = {};
                    newReadList.books = books.filter(book => book.shelf === categories.READ[0]);
                    newReadList.shelf = categories.READ[1];

                    this.setState({
                        currentList: newCurrentList,
                        wishList: newWishList,
                        readList: newReadList,
                        isLoading: false,
                        books
                    });
                }
            })
            .catch(err => {
                this.setState({
                    currentList: [],
                    wishList: [],
                    readList: [],
                    isLoading: false,
                    books: []
                });
            })

        ;
    }
    moveFromCurrentList(book, toShelf) {
        const title = book.title;
        this.setState(prevState => {
            let newWishList = prevState.wishList;
            let newReadList = prevState.readList;
            let newNoneList = prevState.noneList;
            // 'book' is immutable as it's prop in the BookComponent!
            let newBook = Object.assign({}, book, {shelf: toShelf});
            if (toShelf === categories.WISH[1]) {
                newWishList.books = [...newWishList.books, newBook];
            }
            else if (toShelf === categories.NONE[1]){
                newNoneList.books = [...newNoneList.books, newBook];
            }
            else {
                newReadList.books = [...newReadList.books, newBook];
            }
            let newCurrentListBooks = prevState.currentList.books.filter(book => book.title !== title);
            let newCurrentList = prevState.currentList;
            newCurrentList.books = newCurrentListBooks;
            return ({
                currentList: newCurrentList,
                wishList: newWishList,
                readList: newReadList,
                noneList: newNoneList,
                books: [...newCurrentList.books, ...newWishList.books, ...newReadList.books,...newNoneList.books]
            })
        });
    }

    moveFromWishList(book, toShelf) {
        const title = book.title;
        this.setState(prevState => {
            let newCurrentList = prevState.currentList;
            let newReadList = prevState.readList;
            let newNoneList = prevState.noneList;
            // 'book' is immutable as it's prop in the BookComponent!
            let newBook = Object.assign({}, book, {shelf: toShelf});
            if (toShelf === categories.READ[1]) {
                newReadList.books = [...newReadList.books, newBook];
            }
            else if (toShelf === categories.NONE[1]){
                newNoneList.books = [...newNoneList.books, newBook];
            }
            else {
                book.shelf = categories.CURRENT[0];
                newCurrentList.books = [...newCurrentList.books, newBook];
            }

            let newWishListBooks = prevState.wishList.books.filter(book => book.title !== title);
            let newWishList = prevState.wishList;
            newWishList.books = newWishListBooks;
            return ({
                currentList: newCurrentList,
                wishList: newWishList,
                readList: newReadList,
                noneList: newNoneList,
                books: [...newCurrentList.books, ...newWishList.books, ...newReadList.books,...newNoneList.books]
            })
        });
    }

    moveFromReadList(book, toShelf) {
        const title = book.title;
        this.setState(prevState => {
            let newCurrentList = prevState.currentList;
            let newWishList = prevState.wishList;
            let newNoneList = prevState.noneList;
            // 'book' is immutable as it's prop in the BookComponent!
            let newBook = Object.assign({}, book, {shelf: toShelf});

            if (toShelf === categories.WISH[1]) {
                newWishList.books = [...newWishList.books, newBook];
            }
            else if (toShelf === categories.CURRENT[1]){
                newCurrentList.books = [...newCurrentList.books, newBook];
            }
            else if (toShelf === categories.NONE[1]){
                newNoneList.books = [...newNoneList.books, newBook];
            }
            let newReadListBooks = prevState.readList.books.filter(book => book.title !== title);
            let newReadList = prevState.readList;
            newReadList.books = newReadListBooks;
            return ({
                currentList: newCurrentList,
                wishList: newWishList,
                readList: newReadList,
                noneList: newNoneList,
                books: [...newCurrentList.books, ...newWishList.books, ...newReadList.books, ...newNoneList.books]
            })
        });
    }

    addToLibrary(book, toShelf) {
        this.setState(prevState => {
            let newCurrentList = prevState.currentList;
            let newWishList = prevState.wishList;
            let newReadList = prevState.readList;
            let newNoneList = prevState.noneList;

            const title = book.title;
            // 'book' is immutable as it's prop in the BookComponent!
            let newBook = Object.assign({}, book, {shelf: toShelf});
            if (toShelf === categories.CURRENT[1]) {
                newCurrentList.books = [...newCurrentList.books, newBook];
            }
            else if (toShelf === categories.WISH[1]) {
                newWishList.books = [...newWishList.books, newBook];
            }
            else if (toShelf === categories.READ[1]){
                newReadList.books = [...newReadList.books, newBook];
            }
            newNoneList.books = prevState.noneList.books.filter(book => book.title !== title);

            return ({
                currentList: newCurrentList,
                wishList: newWishList,
                readList: newReadList,
                noneList: newNoneList,
                books: [...newCurrentList.books, ...newWishList.books, ...newReadList.books, ...newNoneList.books]
            });
        });
    }

    render() {
        const libProps = {
            currentList: this.state.currentList,
            wishList: this.state.wishList,
            readList: this.state.readList,
            noneList: this.state.noneList,
            actions: {
                moveFromCurrentList: this.moveFromCurrentList,
                moveFromWishList: this.moveFromWishList,
                moveFromReadList: this.moveFromReadList,
                addToLibrary: this.addToLibrary
            },
            isLoading: this.state.isLoading
        };
        return (
            <div>
                <Route exact path='/' render={() => (
                    <div>
                        <MyLibrary {...libProps} />
                        <div className="open-search">
                            <Link to='/search'>Close</Link>
                        </div>
                    </div>
                )}/>
                <Route path='/search' render={() => (
                    <SearchBook
                        { ...libProps.actions }
                        library={this.state.books}
                    />

                )}/>
            </div>
        )
    }
}

export default BooksApp;

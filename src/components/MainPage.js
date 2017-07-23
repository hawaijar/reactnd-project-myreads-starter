import React from 'react';
import { shape, string, arrayOf } from 'prop-types';
import * as Constants from '../constant/index';
import MyLibrary from './myLibrary';

const MainPage = ({ books }) => {
    let currentList = {};
    currentList.books = books.filter(book => book.shelf === Constants.categories.CURRENT[0]);
    currentList.shelf = Constants.categories.CURRENT[1];

    let wishList = {};
    wishList.books = books.filter(book => book.shelf === Constants.categories.WISH[0]);
    wishList.shelf = Constants.categories.WISH[1];

    let readList = {};
    readList.books = books.filter(book => book.shelf === Constants.categories.READ[0]);
    readList.shelf = Constants.categories.READ[1];

    if(books.length > 0) {
        console.log(books);
    }

    const libProps = {
        currentList,
        wishList,
        readList,
        noneList: {
            books: []
        }
    };

    return (
        <div>
            <MyLibrary {...libProps} />
        </div>
    )
};

MainPage.propTypes = {
    books: arrayOf(shape({
        id: string.isRequired,
        shelf: string.isRequired,
        title: string.isRequired,
        authors: arrayOf(string),
        imageLinks: shape({
            thumbnail: string
        })
    }))
};

export default MainPage;
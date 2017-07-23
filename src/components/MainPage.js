import React from 'react';
import { shape, string, arrayOf } from 'prop-types';

const MainPage = ({ books }) => {
    if(books.length > 0) {
        console.log(books);
    }
    return (
        <div>Main page</div>
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
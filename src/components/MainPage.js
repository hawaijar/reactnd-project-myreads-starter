import React from 'react';
import { shape, string, arrayOf } from 'prop-types';
import MyLibrary from './MyLibrary';

const MainPage = (props) => {
    const {currentList, wishList, readList, noneList, syncData} = props;
    const libProps = {
        currentList,
        wishList,
        readList,
        noneList,
        syncData
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
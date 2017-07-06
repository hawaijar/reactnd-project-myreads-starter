/**
 * Created by hawaijar on 7/4/17.
 */
import React from 'react'
import {PropTypes} from 'prop-types';

const Book = (props) => {
    const book = props.book;
    const { title, authors, backgroundImage } = book;
    const {shelf, moveBookToAnotherShelf} = props;

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${backgroundImage}`
                }}>{true}</div>
                <div className="book-shelf-changer">
                    <select value={ shelf }
                            onChange={ (e) => moveBookToAnotherShelf(book, shelf, e.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{ title }</div>
            <div className="book-authors">{ authors }</div>
        </div>
    )
};
Book.propTypes = {
    shelf: PropTypes.string.isRequired,
    book: PropTypes.object.isRequired,
    moveBookToAnotherShelf: PropTypes.func
};
Book.defaultProps = {
    shelf: '',
    book: {}
};

export default Book;

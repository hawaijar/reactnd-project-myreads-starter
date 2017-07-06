/**
 * Created by hawaijar on 7/4/17.
 */
import React, {Component} from 'react'
import {PropTypes} from 'prop-types';

export default class Book extends Component {
    static  propTypes = {
        shelf: PropTypes.string.isRequired,
        book: PropTypes.object.isRequired,
        moveBookToAnotherShelf: PropTypes.func.isRequired
    };
    static defaultProps = {
        book: {shelf: 'None'}
    };

    state = {
        book: {},
        selectedBookId: ''
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            book: nextProps.book
        })
    }

    render() {
        const book = this.props.book;
        const {title, authors, backgroundImage} = book;
        let {shelf, moveBookToAnotherShelf} = this.props;

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
                                onChange={
                                    (e) => {
                                        const value = e.target.value;
                                        if (value !== shelf) {
                                            moveBookToAnotherShelf(book, value);
                                        }
                                    }
                                }>
                            <option value="default" disabled>Move to...</option>
                            <option value="Currently Reading">Currently Reading</option>
                            <option value="Want to Read">Want to Read</option>
                            <option value="Read">Read</option>
                            <option value="None">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{ title }</div>
                {authors.map(author => (
                    <div key={ author} className="book-authors">{ author }</div>
                ))}

            </div>
        )
    }
}


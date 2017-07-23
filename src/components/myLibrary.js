/**
 * Created by hawaijar on 7/4/17.
 */
import React from 'react'
import BookShelf from './bookShelf';
import '../App.css'

const MyLibrary = (props) => {
    const {currentList, wishList, readList, noneList} = props;
    // const {
    //     moveFromCurrentList,
    //     moveFromWishList,
    //     moveFromReadList,
    //     addToLibrary } = props.actions;
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf
                            shelf={ currentList.shelf }
                            books={ currentList.books }
                        />

                        <BookShelf
                            shelf={ wishList.shelf }
                            books={ wishList.books }
                        />

                        <BookShelf
                            shelf={ readList.shelf }
                            books={ readList.books }
                        />
                        {noneList.books.length > 0 && <BookShelf
                            shelf={ noneList.shelf }
                            books={ noneList.books }
                        />}
                    </div>
             </div>
        </div>
    )
};

export default MyLibrary;

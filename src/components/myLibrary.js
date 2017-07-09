/**
 * Created by hawaijar on 7/4/17.
 */
import React from 'react'
import BookShelf from './bookShelf';

const MyLibrary = (props) => {
    const {currentList, wishList, readList, noneList, isLoading} = props;
    const {
        moveFromCurrentList,
        moveFromWishList,
        moveFromReadList,
        addToLibrary } = props.actions;
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            {isLoading ? (
                {/*<Loader color="#26A65B" size="16px" margin="4px"/>*/}
            ) : (
                <div className="list-books-content">
                    <div>
                        <BookShelf
                            shelf={ currentList.shelf }
                            books={ currentList.books }
                            moveBookToAnotherShelf={ moveFromCurrentList }
                        />
                        <BookShelf
                            shelf={ wishList.shelf }
                            books={ wishList.books }
                            moveBookToAnotherShelf={ moveFromWishList }
                        />
                        <BookShelf
                            shelf={ readList.shelf }
                            books={ readList.books }
                            moveBookToAnotherShelf={ moveFromReadList }
                        />
                        {noneList.books.length > 0 && <BookShelf
                            shelf={ noneList.shelf }
                            books={ noneList.books }
                            moveBookToAnotherShelf={ addToLibrary }
                        />}
                    </div>
                    {/*<div className="open-search">
                     <a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
                     </div>*/}
                </div>
            )}
        </div>
    )
};

export default MyLibrary;

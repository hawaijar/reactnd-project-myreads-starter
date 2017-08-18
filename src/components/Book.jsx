import React from 'react';
import * as Constants from '../constant';

const Book = ({ title, authors, thumbnail, shelf }) => {
	return (
		<div className="book">
			<div className="book-top">
				<div
					className="book-cover"
					style={{
						width: 128,
						height: 193,
						backgroundImage: `url(${thumbnail})`
					}}
				>
					{true}
				</div>
				<div className="book-shelf-changer">
					<select value={shelf} onChange={e => e}>
						<option value="default" disabled>
							Move to...
						</option>
						<option value="Currently Reading">Currently Reading</option>
						<option value="Want to Read">Want to Read</option>
						<option value="Read">Read</option>
						<option value="None">None</option>
					</select>
				</div>
			</div>
			<div className="book-title">
				{title}
			</div>
			{authors.map(author =>
				<div key={author} className="book-authors">
					{author}
				</div>
			)}
		</div>
	);
};

export default Book;

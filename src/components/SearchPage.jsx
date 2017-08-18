import React from 'react';
import { Link } from 'react-router-dom';
import '../App.scss';

const SearchPage = () =>
	<div className="search-books">
		<div className="search-books-bar">
			<Link className="close-search" to="/" onClick={this.reset}>
				Close
			</Link>
			<div className="search-books-input-wrapper">
				<input type="text" value={''} placeholder="Search by title or author" />
			</div>
		</div>
	</div>;

export default SearchPage;

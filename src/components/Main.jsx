// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import store from '../store';
import Library from './Library';
import SearchPage from './SearchPage';

const Main = props => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<div>
					<Switch>
						<Route exact path="/" component={Library} />
						<Route path="/search" component={SearchPage} />
						<Redirect to="/" />
					</Switch>
				</div>
			</Provider>
		</BrowserRouter>
	);
};

export default Main;

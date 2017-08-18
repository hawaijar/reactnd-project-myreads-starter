import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Library from './Library';

class Main extends Component {
	render() {
		return (
			<Provider store={store}>
				<Library />
			</Provider>
		);
	}
}

export default Main;

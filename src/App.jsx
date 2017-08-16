import React from 'react';
import { render } from 'react-dom';
import './App.scss';

const App = () => {
	return (
		<div>
			<h1 className="title">Hello React</h1>
		</div>
	);
};

render(<App />, document.getElementById('root'));

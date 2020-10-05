import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game'
import './index.css';
import './assets/fonts/BurbankBigCondensed.otf';

ReactDOM.render(
	<div className="container">
		<Game title="Rock Paper Scissors"/>
	</div>,
    document.getElementById('root')
);
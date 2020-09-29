import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Ben extends React.Component {
	constructor(props){
		super();
	}

	render(){
		return(
		<p>{this.props.value}</p>
		)
	}
}

ReactDOM.render(
  <Ben value="Ben"/>,
  document.getElementById('root')
);
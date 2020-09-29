import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Oscar extends React.Component {
    
    constructor(props){
        super()
    }

    render(){
        return (
            <p>{this.props.name}´s {this.props.type}</p>
        );
    }
}


ReactDOM.render(
    <Oscar name="Oscar" type="test" />,
    document.getElementById('root')
);
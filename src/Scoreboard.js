import React from 'react';
import './Scoreboard.css';

const Scoreboard = (props) => {
    return(
        <div className="scoreboard-container">
            <div>
                <h3>Scoreboard:</h3>
                <p>{props.player}</p>
                <p>{props.cpu}</p>
            </div>
        </div>
    );
}

export default Scoreboard;
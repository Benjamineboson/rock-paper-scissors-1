import React from 'react';
import './Scoreboard.css';

const Scoreboard = (props) => {
    return (
        <div>
            <div className="roundWinner">
                <h1 className="playerWon">{props.winner}</h1>
            </div>
            <div className="scoreboard-container">
                <div className="playerHand">
                    <p className="playerWonCount">{props.player.name}: {props.player.winCount}</p>
                    <ol>
                        {props.player.moves.map((weapon, index) => (
                            <li key={index}> {weapon}</li>
                        ))}
                    </ol>
                </div>
                <div className="computerHand">
                    <p className="computerWonCount">{props.computer.name}: {props.computer.winCount}</p>
                    <ol>
                        {props.computer.moves.map((weapon, index) => (
                            <li key={index}>{weapon}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default Scoreboard;
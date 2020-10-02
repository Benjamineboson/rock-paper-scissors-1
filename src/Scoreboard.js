import React from 'react';
import './Scoreboard.css';

const Scoreboard = (props) => {


    if(props.winner === "Player one wins") {
        return (
            <div className="scoreboard-container">
                <div className="roundWinner">
                    <h1 className="playerWon">{props.winner}</h1>
                </div>
                <div className="scoreboard">
                    <h4>Scoreboard:</h4>
                    <div className="roundsWonCount">
                        <p className="playerWonCount">{props.player.name}: {props.player.winCount}</p>
                        <p className="computerWonCount">{props.computer.name}: {props.computer.winCount}</p>    
                    </div>
                    <div className="playersHand-container">
                        <div className="playerHand">
                            <ol>
                                {props.player.hand.map((weapon, index) => (
                                    <li key={index}>{weapon}</li>
                                ))}
                            </ol>
                        </div>
                        <div className="computerHand">
                            <ol>
                                {props.computer.hand.map((weapon, index) => (
                                    <li key={index}>{weapon}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else if( props.winner === "'Computer wins'") {
        return (
            <div className="scoreboard-container">
                <div className="roundWinner">
                    <h1 className="computerWon">{props.winner}</h1>
                </div>
                <div className="scoreboard">
                    <h4>Scoreboard:</h4>
                    <div className="roundsWonCount">
                        <p className="playerWonCount">{props.player.name}: {props.player.winCount}</p>
                        <p className="computerWonCount">{props.computer.name}: {props.computer.winCount}</p>    
                    </div>
                    <div className="playersHand-container">
                        <div className="playerHand">
                            <ol>
                                {props.player.hand.map((weapon, index) => (
                                    <li key={index}>{weapon}</li>
                                ))}
                            </ol>
                        </div>
                        <div className="computerHand">
                            <ol>
                                {props.computer.hand.map((weapon, index) => (
                                    <li key={index}>{weapon}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else { 
        return(
            <div className="scoreboard-container">
                <div className="roundWinner">
                    <h1>{props.winner}</h1>
                </div>
                <div className="scoreboard">
                    <h4>Scoreboard:</h4>
                    <div className="roundsWonCount">
                        <p className="playerWonCount">{props.player.name}: {props.player.winCount}</p>
                        <p className="computerWonCount">{props.computer.name}: {props.computer.winCount}</p>    
                    </div>
                    <div className="playersHand-container">
                        <div className="playerHand">
                            <ol>
                                {props.player.hand.map((weapon, index) => (
                                    <li key={index}>{weapon}</li>
                                ))}
                            </ol>
                        </div>
                        <div className="computerHand">
                            <ol>
                                {props.computer.hand.map((weapon, index) => (
                                    <li key={index}>{weapon}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Scoreboard;
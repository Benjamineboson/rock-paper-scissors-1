import React from 'react';
import './Player.css';
import Scissors from './images/small-scissors.png';
import Paper from './images/small-paper.png';
import Rock from './images/small-rock.png';

class Player extends React.Component{
    constructor(props){
        super();
        this.state = {
            playerName: props.playerName,
        }
    }

    render(){
        return(
            <div className="player-container">
                <div className="player-name">
                    <h2>{this.state.playerName}</h2>
                </div>
                <div className="weapon-container">
                    <img className="weapon-image" src={this.props.weapon === "rock" ? Rock : this.props.weapon === "scissors" ? Scissors : Paper} alt="paper"></img>
                </div>
            </div>
        )
    }
}

export default Player;
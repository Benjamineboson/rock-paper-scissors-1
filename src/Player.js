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
            <div>
                <div>
                    <h2>{this.state.playerName}</h2>
                </div>
                <div>
                    <img className="player-image" src={this.props.weapon === "rock" ? Rock : this.props.weapon === "scissors" ? Scissors : Paper} alt="paper"></img>
                </div>
            </div>
        )
    }
}

export default Player;
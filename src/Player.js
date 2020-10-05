import React from 'react';
import './Player.css';
import Scissors from './assets/images/small-scissors.png';
import Paper from './assets/images/small-paper.png';
import Rock from './assets/images/small-rock.png';
import QuestionMark from './assets/images/questionMark.png';

class Player extends React.Component{
    constructor(props){
        super();
        this.state = {
            playerName: props.playerName,
        }
    }

    render(){
        if (this.props.isNewRound){
            return(
                <div className="player-container">
                    <div className="player-name">
                        <h2>{this.state.playerName}: {this.props.score}</h2>
                    </div>
                    <div className="weapon-container">
                        <img className="weapon-image" src={QuestionMark} alt="paper"></img>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="player-container">
                    <div className="player-name">
                        <h2>{this.state.playerName}: {this.props.score}</h2>
                    </div>
                    <div className="weapon-container">
                        <img className="weapon-image" src={this.props.weapon === "rock" ? Rock : this.props.weapon === "scissors" ? Scissors : this.props.weapon === 'paper' ? Paper : QuestionMark} alt="paper"></img>
                    </div>
                </div>
            )
        }
    }
}

export default Player;
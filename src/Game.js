import React from 'react';
import './index.css';
import Player from './Player';

class Game extends React.Component{
	constructor(props){
		super();
		this.state = {
			numberOfRounds : 0,
			playerName:  ''
		}
		this.startGame = this.startGame.bind(this);
	}

	render(){
		if (this.state.playerName.length > 1 && this.state.numberOfRounds > 0){
			return(
				<div>
					<div>
						<h1>Player: {this.state.playerName}</h1>
						<h1>Number of rounds: {this.state.numberOfRounds}</h1>
					</div>
					<div className="gameContainer">
					<div className="player">
						<Player playerName={this.state.playerName}/>
					</div>
					<div className="computer">
						<h2>Computer</h2>
					</div>
					</div>
				</div>
			)
		}else{
			return(
				<div>
					<div className="rubric">
						<h1>Rock Paper Scissors</h1>
					</div>
					<div className="setupForm">
						<form onSubmit={this.startGame}>
							<input type="number" name="roundsInput" placeholder="Enter amount of rounds"/>
							<input type="text" name="userNameInput" placeholder="Enter your username"/>
							<input type="submit" value="Start Game"/>
						</form>
					</div>
				</div>
			)
		}
		
	}

	startGame(event){
		event.preventDefault();
		this.setState({
			numberOfRounds: event.target.roundsInput.value,
			playerName: event.target.userNameInput.value,
		})
	}
}

export default Game;
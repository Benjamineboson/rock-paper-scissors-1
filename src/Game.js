import React from 'react';
import './Game.css';
import Player from './Player';

const weapons = ['rock', 'paper', 'scissors']

class Game extends React.Component{
	constructor(props){
		super();
		this.state = {
			numberOfRounds : 0,
            playerName:  '',
            playerOne: weapons[0]
		}
		this.startGame = this.startGame.bind(this);
    }
    
    /**
     * Select rock, paper or scissors.
     * @param {*} weapon - the selected choice from button click.
     */
    selectWeapon = (weapon) => {
        this.setState({
            playerOne: weapon,
        });
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
                            <Player playerName={this.state.playerName} weapon={this.state.playerOne}/>
                        </div>
                        <div className="computer">
                            <Player playerName="Computer"/>
                        </div>
					</div>
                    <div className="btn-container">
                        <button className="btnWeapon" onClick={() => this.selectWeapon("rock")}>Rock</button>
                        <button className="btnWeapon" onClick={() => this.selectWeapon("paper")}>Paper</button>
                        <button className="btnWeapon" onClick={() => this.selectWeapon("scissors")}>Scissors</button>
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
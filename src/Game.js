import React from 'react';
import './Game.css';
import Player from './Player';
import Scoreboard from './Scoreboard';

const weapons = ['?','rock', 'paper', 'scissors'];

class Game extends React.Component{
	constructor(props){
		super();
		this.state = {
			numberOfRounds : 1,
            playerName:  '', //*
			playerOne: weapons[0], //*
			computer: weapons[0], //*
			winner : '',
			counter: 1,
			isNewRound: true,
			playerWinCount: 0, //*
			computerWinCount: 0, //*

		}
		this.startGame = this.startGame.bind(this);
    }
    
    /**
     * Select rock, paper or scissors.
     * @param {*} weapon - the selected choice from button click.
     */
    selectWeapon = (weapon) => {
        this.setState({
			playerOne: weapons[weapon],
			computer : weapons[Math.floor(Math.random()*3)+1], //Redo - more advanced.
			isNewRound: true,
		});	
    }

	render(){
		if (this.state.counter > this.state.numberOfRounds){
			return(
				<div>
					<div>
						<h1>
							{this.calculateTotal()}
						</h1>
					</div>
				</div>
			)
		}else if (this.state.playerName.length > 1 && this.state.numberOfRounds > 0){
			return(
				<div>
					<div>
						<h1>Player: {this.state.playerName}</h1>
						<h1>Number of rounds: {(this.state.numberOfRounds - this.state.counter)+1}</h1>
					</div>
					<div className="gamesContainer">
                        <div className="player">
                            <Player playerName={this.state.playerName} weapon={this.state.playerOne}/>
                        </div>
                        <div className="computer">
                            <Player playerName="Computer" isNewRound={this.state.isNewRound} weapon={this.state.computer}/>
                        </div>
					</div>
                    <div className="btn-container">
                        <button className="btnWeapon" onClick={() => this.selectWeapon(1)}>Rock</button>
                        <button className="btnWeapon" onClick={() => this.selectWeapon(2)}>Paper</button>
                        <button className="btnWeapon" onClick={() => this.selectWeapon(3)}>Scissors</button>
                    </div>
					<div>
						<button className="startRoundBtn" onClick={()=> this.startRound()}>Start Round</button>
					</div>
                    <div>
                        <Scoreboard player={this.state.playerName}  winner={this.state.winner} cpu="Computer"/>
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

	calculateTotal = () =>{
		if (this.state.playerWinCount > this.state.computerWinCount){
			return "Player won!"
		}else{
			return "Computer won!"
		}
	}

	startRound(){
		this.setState({
			winner : this.selectWinner(),
			isNewRound : false,
		})	
		console.log("Computer: "+this.state.computer);
		console.log("Player : "+this.state.playerOne);
	}

	startGame(event){
		event.preventDefault();
		this.setState({
			numberOfRounds: event.target.roundsInput.value,
			playerName: event.target.userNameInput.value,
		})
	}

	selectWinner(){
		let count = this.state.counter;
		const {playerOne,computer} = this.state;
		if (playerOne === computer){
			return 'Tie'
		}else if (
			(playerOne === 'rock' && computer === 'scissors') ||
			(playerOne === 'scissors' && computer === 'paper') ||
			(playerOne === 'paper' && computer === 'rock')
		){
			this.setState({
				counter : count+1,
				// numberOfRounds: this.state.numberOfRounds - 1,
				playerWinCount: this.state.playerWinCount + 1,
			})
			return 'Player one wins'
		}else{
			this.setState({
				counter : count+1,
				// numberOfRounds: this.state.numberOfRounds - 1,
				computerWinCount: this.state.computerWinCount + 1,

			})
			return 'Computer wins'
		}
	}
}



export default Game;
import React from 'react';
import './Game.css';
import Player from './Player';
import Scoreboard from './Scoreboard';

class Game extends React.Component{
	constructor(props){
		super();
		this.state = {
			weapons :  ['?','rock', 'paper', 'scissors'],
			player : {
				weapon: '?',
				name: '',
                winCount : 0,
				moves: [],
				winningMoves: [],
			},
			computer :{
				weapon: '?',
				name: 'Computer',
                winCount : 0,
                moves: [],
			},
			numberOfRounds : 1,
			winner : '',
			counter: 1,
			isNewRound: true,
		}
    }
	/**
	 * Method to start a new game.
	 * @param {*} event - stores input values(userName and numberOfRounds) from user.
	 */
	startGame = (event) =>{
		event.preventDefault();
		const {player} = this.state;
		player.name = event.target.userNameInput.value;
		this.setState({
			numberOfRounds: event.target.roundsInput.value,
			player : player,
		})
	}

 	/**
     * Select rock, paper or scissors.
     * @param {*} weapon - the selected choice from button click.
     */
	selectWeapon = (weapon) => {
		const {player,computer,weapons} = this.state;		
		player.weapon = weapons[weapon];
        computer.weapon = this.computerWeaponSelect(); 
		this.setState({
			player : player,
			computer : computer,
			isNewRound: true,
		});	
    }

	/**
	 * Method with intelligent weapon choice functionality.
	 */
	computerWeaponSelect = () =>{
		const {counter,weapons} = this.state;
		if (counter === 1){
			return weapons[Math.floor(Math.random()*3)+1];
		}else{
			return weapons[1];
		}
		
	}


	/**
	 * Method to start a new round and calls method selectWinner. Prevents new round if: weapon = '?' and isNewRound = true.
	 */
	startRound(){
		const {player,computer,isNewRound,weapons} = this.state;
		if (player.weapon !== weapons[0] && isNewRound){
			player.moves.push(player.weapon);
			computer.moves.push(computer.weapon);
			this.setState({
				player: player,
				computer: computer,
				winner : this.selectWinner(),
				isNewRound : false,
			})	
		}
	}

	/**
	 * Method that returns the name of the winner or tie if it's a draw. And increments the winCount of the winner.
	 */
	selectWinner(){
		const {player,computer,counter} = this.state;
		if (player.weapon === computer.weapon){
			return 'Tie'
		}else if (
			(player.weapon === 'rock' && computer.weapon === 'scissors') ||
			(player.weapon === 'scissors' && computer.weapon === 'paper') ||
			(player.weapon === 'paper' && computer.weapon === 'rock')
		){
			player.winCount += 1;
			player.winningMoves.push(player.weapon);
			this.setState({
				counter : counter + 1,
				player: player,
			})
			console.log(player.winningMoves);
			return 'Player one wins'
		}else{
            computer.winCount += 1;
			this.setState({
				counter : counter + 1,
                computer: computer,
			})
			return 'Computer wins'
		}
	}


	/**
	 * Compares numbers of rounds won. Returns the winner of the whole game. 
	 */
	calculateTotal = () =>{
		if (this.state.player.winCount > this.state.computer.winCount){
			return "Player won!"
		}else{
			return "Computer won!"
		}
	}

	render(){
		const {player,computer,counter,numberOfRounds,isNewRound,winner} = this.state;
		if (counter > numberOfRounds){
			return(
				<div>
					<div>
						<h1>
							{this.calculateTotal()}
						</h1>
					</div>
				</div>
			)
        }else if (player.name.length > 1 && numberOfRounds > 0){
			return(
				<div>
					<div>
						<h1>Player: {player.name}</h1>
						<h1>Number of rounds played: {counter - 1} / {numberOfRounds}</h1>
					</div>
					<div className="gamesContainer">
                        <div className="player">
                            <Player playerName={player.name} weapon={player.weapon}/>
                        </div>
                        <div className="computer">
                            <Player playerName={computer.name} isNewRound={isNewRound} weapon={computer.weapon}/>
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
                        <Scoreboard player={player} winner={winner} computer={computer}/>
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
							<input type="Radio" id="roundsInput5" name="roundsInput" placeholder="Enter amount of rounds" checked="checked" value="5"/>
                            <label for="roundsInput5">5</label>
                            <input type="Radio" id="roundsInput7" name="roundsInput" placeholder="Enter amount of rounds" value="7"/>
                            <label for="roundsInput7">7</label>
                            <input type="Radio" id="roundsInput9" name="roundsInput" placeholder="Enter amount of rounds" value="9"/>
                            <label for="roundsInput9">9</label>
							<input type="text" name="userNameInput" placeholder="Enter your username" defaultValue="Test Player"/>
							<input type="submit" value="Start Game"/>
						</form>
					</div>
				</div>
			)
		}
	}
}

export default Game;


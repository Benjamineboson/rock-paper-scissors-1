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
				rocks : [],
				papers : [],
				scissors : [],
			},
			computer :{
				weapon: '?',
				name: 'Computer',
                winCount : 0,
				moves: [],
				losingStreak : 0,
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
		const {counter,weapons,player,computer} = this.state;
		if (computer.losingStreak > 0 || counter < 2){
			return weapons[Math.floor(Math.random()*3)+1];
		}else{
			let tempRocks = [];	let tempScissors = []; let tempPapers = [];
			player.moves.forEach((move)=>{
				if (move === 'scissors'){
					tempScissors.push(move);
					player.scissors = tempScissors;
				}else if (move === 'rock'){
					tempRocks.push(move);
					player.rocks = tempRocks;
				}else{
					tempPapers.push(move);
					player.papers = tempPapers;
				}
			});
			this.setState ({
				player : player,
			})
			if (player.scissors.length > player.rocks.length & player.scissors.length > player.papers.length) return weapons[1];
			if (player.rocks.length > player.papers.length & player.rocks.length > player.scissors.length) return weapons[2];
			if (player.papers.length > player.rocks.length & player.papers.length > player.scissors.length) return weapons[3];
			return weapons[Math.floor(Math.random()*3)+1];
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
			return 'Looks like a Tie - play again!'
		}else if (
			(player.weapon === 'rock' && computer.weapon === 'scissors') ||
			(player.weapon === 'scissors' && computer.weapon === 'paper') ||
			(player.weapon === 'paper' && computer.weapon === 'rock')
		){
			player.winCount += 1;
			computer.losingStreak += 1;
			this.setState({
				computer : computer,
				counter : counter + 1,
				player: player,
			})
			console.log(player.winningMoves);
			return 'You won this round!'
		}else{
			computer.winCount += 1;
			computer.losingStreak = 0;
			this.setState({
				counter : counter + 1,
                computer: computer,
			})
			return 'Computer won this round!'
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


	/**
	 * Clears the game board, and starts a new game. 
	 */
	replay = () => {
		const {player,computer,counter} = this.state;
		player.winCount = 0;
		player.moves = [];
		player.rocks = [];
		player.scissors = [];
		player.papers = [];
		player.weapon = '?'
		computer.losingStreak = 0;
		computer.winCount = 0;
		computer.moves = [];

		this.setState({
			player : player,
			computer : computer,
			isNewRound : true,
			counter : (counter-counter)+1,
		})
	}

	render(){
		const {player,computer,counter,numberOfRounds,isNewRound,winner} = this.state;
		if (counter > numberOfRounds){
			return(
				<div className="endOfGameContainer">
					<div classname="winner">
						<h1 className="theWinner">
							{this.calculateTotal()}
						</h1>
                        <div className="winnerScoreboard">
                            <Scoreboard replay={()=>this.replay} player={player} computer={computer}/>
                        </div>
						<div>
              				<button onClick={this.replay}>Replay Game</button>
            			</div>
					</div>
				</div>
			)
        }else if (player.name.length > 1 && numberOfRounds > 0){
			return(
				<div className="gameContainer">
					<div className="playersContainer">
                        <div className="player">
                            <Player score={player.winCount} playerName={player.name} weapon={player.weapon}/>
                            <div className="btnContainer">
                                <button className="btnWeapon" onClick={() => this.selectWeapon(1)}>Rock</button>
                                <button className="btnWeapon" onClick={() => this.selectWeapon(2)}>Paper</button>
                                <button className="btnWeapon" onClick={() => this.selectWeapon(3)}>Scissors</button>
                            </div>
                        </div>
                        <div className="computer">
                            <Player score={computer.winCount} playerName={computer.name} isNewRound={isNewRound} weapon={computer.weapon}/>
                        </div>
					</div>
					<div className="startRound">
                        <p>Round: {counter - 1} / {numberOfRounds}</p>
						<button className="startRoundBtn" onClick={()=> this.startRound()}>Start Round</button>
					</div>
                    <div>
                        <Scoreboard player={player} winner={winner} computer={computer}/>
                    </div>
				</div>
			)
        }else{
			return(
				<div className="startGame-container">
					<div className="gameTitle">
						<h1>{this.props.title}</h1>
					</div>
					<div className="setupForm">
						<form onSubmit={this.startGame}>
                            <div className="userNameInput">
                                <label>Player Name:</label><br></br>
                                <input type="text" name="userNameInput" placeholder="Enter your username"/>
                            </div>
                            <div className="roundsInput">
                                <label id="numberofRoundsLable">Enter number of rounds:</label>
                                <div className="rounds">
                                    <label>5
                                    <input type="Radio"  name="roundsInput" placeholder="Enter amount of rounds" defaultChecked="checked" defaultValue="5"/></label>
                                    <label>7
                                    <input type="Radio"  name="roundsInput" placeholder="Enter amount of rounds" defaultValue="7"/></label>
                                    <label>9
                                    <input type="Radio"  name="roundsInput" placeholder="Enter amount of rounds" defaultValue="9"/></label>
                                </div>
                            </div>
                            <input className="submitBtn" type="submit" value="Start Game"/>
						</form>
					</div>
				</div>
			)
		}
	}
}



export default Game;


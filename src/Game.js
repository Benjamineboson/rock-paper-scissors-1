import React from 'react';
import './Game.css';
import Player from './Player';
import Scoreboard from './Scoreboard';

const weapons = ['?','rock', 'paper', 'scissors'];

class Game extends React.Component{
	constructor(props){
		super();
		this.state = {
			player : {
				weapon: weapons[0],
				name: '',
                winCount : 0,
                hand: [],
			},
			computer :{
				weapon: weapons[0],
				name: 'Computer',
                winCount : 0,
                hand: [],
			},
			numberOfRounds : 1,
			winner : '',
			counter: 1,
			isNewRound: true,
		}
		this.startGame = this.startGame.bind(this);
    }
    
    /**
     * Select rock, paper or scissors.
     * @param {*} weapon - the selected choice from button click.
     */
    selectWeapon = (weapon) => {
		let playerOne = this.state.player;
		playerOne.weapon = weapons[weapon];
		let computerOne = this.state.computer;
        computerOne.weapon = weapons[Math.floor(Math.random()*3)+1] 

		this.setState({
			player : playerOne,
			computer : computerOne, //Redo - more advanced.
			isNewRound: true,
		});	
    }

	render(){

        let playerOne = this.state.player;
        let computer = this.state.computer;
        console.log(playerOne);
        

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
        }
        
        else if (this.state.player.name.length > 1 && this.state.numberOfRounds > 0){
			return(
				<div>
					<div>
						<h1>Player: {this.state.player.name}</h1>
						<h1>Number of rounds played: {this.state.counter - 1} / {this.state.numberOfRounds}</h1>
					</div>
					<div className="gamesContainer">
                        <div className="player">
                            <Player playerName={this.state.player.name} weapon={this.state.player.weapon}/>
                        </div>
                        <div className="computer">
                            <Player playerName={this.state.computer.name} isNewRound={this.state.isNewRound} weapon={this.state.computer.weapon}/>
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
                        <Scoreboard player={playerOne} winner={this.state.winner} computer={computer}/>
                    </div>
				</div>
			)
        }
        
        else{
			return(
				<div>
					<div className="rubric">
						<h1>Rock Paper Scissors</h1>
					</div>
					<div className="setupForm">
						<form onSubmit={this.startGame}>
<<<<<<< HEAD
							<input type="number" name="roundsInput" placeholder="Enter amount of rounds" value="3"/>
							<input type="text" name="userNameInput" placeholder="Enter your username" value="testPlayer"/>
=======
							<input type="number" name="roundsInput" placeholder="Enter amount of rounds" defaultValue="3"/>
							<input type="text" name="userNameInput" placeholder="Enter your username" defaultValue="Test Player"/>
>>>>>>> State-Object-Branch
							<input type="submit" value="Start Game"/>
						</form>
					</div>
				</div>
			)
		}
	}

	calculateTotal = () =>{
		if (this.state.player.winCount > this.state.computer.winCount){
			return "Player won!"
		}else{
			return "Computer won!"
		}
	}

	startRound(){
        let playerOne = this.state.player;
        let tempComputer = this.state.computer;
        playerOne.hand.push(playerOne.weapon);
        tempComputer.hand.push(tempComputer.weapon);

		this.setState({
            player: playerOne,
            computer: tempComputer,
			winner : this.selectWinner(),
			isNewRound : false,
		})	
		console.log("Computer: "+this.state.computer.weapon);
		console.log("Player : "+this.state.player.weapon);
	}

	startGame(event){
		event.preventDefault();
		let playerOne = this.state.player;
		playerOne.name = event.target.userNameInput.value;
		this.setState({
			numberOfRounds: event.target.roundsInput.value,
			player : playerOne
		})
		console.log(this.state.player.name.length);
	}

	selectWinner(){
        let count = this.state.counter;
		const {player,computer} = this.state;
		if (player.weapon === computer.weapon){
			return 'Tie'
		}else if (
			(player.weapon === 'rock' && computer.weapon === 'scissors') ||
			(player.weapon === 'scissors' && computer.weapon === 'paper') ||
			(player.weapon === 'paper' && computer.weapon === 'rock')
		){
			player.winCount += 1;
			this.setState({
				// numberOfRounds: this.state.numberOfRounds - 1, this is not something we want to do! 
				counter : count + 1,
				player: player,
			})
			console.log(this.state.numberOfRounds);
			return 'Player one wins'
		}else{
            computer.winCount += 1;
			this.setState({
				// numberOfRounds: this.state.numberOfRounds - 1,
				counter : count + 1,
                // computerWinCount: this.state.computerWinCount + 1,
                computer: computer,

			})
			console.log(this.state.numberOfRounds);

			return 'Computer wins'
		}
	}
}



export default Game;
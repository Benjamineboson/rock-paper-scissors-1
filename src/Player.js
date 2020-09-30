import React from 'react';

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
                <img alt="HEJ"></img>
                <h2>{this.state.playerName}</h2>
            </div>
        )
    }
}

export default Player;
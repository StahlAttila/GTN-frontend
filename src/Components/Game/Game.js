import React, { Component } from 'react';
import UserStore from '../../Store/UserStore';
import InputField from '../InputField';

class Game extends Component {

    constructor(props) {
        super(props)
        this.state= {
            id: null,
            difficulty: "",
            gameType: "",
            guessDirection: "",
            lives: 0,
            gameStatus: null,
            guess: null
        }
    }

    componentDidMount() {
        let game = JSON.parse(sessionStorage.getItem("ACTIVEGAME"));
        this.setState({
            id: game.id,
            difficulty: game.difficulty,
            guessDirection: game.guessDirection,
            lives: game.lives,
            gameStatus: game.gameStatus,
            gameType: game.gameType,
            buttonDisabled: false
        })
    }

    setInputValue(property, val) {
        this.setState({
            [property]: val
        })
    }

    async sendGuess() {

        const url = process.env.REACT_APP_API_URL

        try {
            
            let res = await fetch(url + '/api/game/guess', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token' : UserStore.token
                },
                body: JSON.stringify({
                    gameId: this.state.id,
                    guess: this.state.guess
                })
            });

            let result = await res.json();
            console.log(result)
            if(result && !result.status) {
                UserStore.activeGame = result
                UserStore.loading = false;
                this.setState({
                    guessDirection: result.guessDirection,
                    lives: result.lives,
                    gameStatus: result.gameStatus
                })

                if( result.gameStatus != null) {
                    this.setState({
                        buttonDisabled: true
                    })
                }
                
            } else {
               
                console.log(result)
                alert(result.message);
            }
        }
        catch(e) {
            console.log(e);
           
        }
    }

    goback() {
        if(this.state.gameType === "RANKED") {
            this.props.history.push('/create-ranked-game')
        } else {
            this.props.history.push('/create-casual-game')
        }     
    }
    
    
    render() {
        return (
            <div>
                <button onClick={() => this.goback()}>Back</button>
                <p>ID: {this.state.id}</p>
                <p>Difficulty: {this.state.difficulty}</p>
                <p>{this.state.guessDirection}</p>
                <p>Lives: {this.state.lives}</p>
                <p>{this.state.gameStatus}</p>

                <div>
                    <InputField
                        type="guess"
                        placeholder="Guess a number"
                        value={this.state.guess ? this.state.guess : ""}
                        onChange={(val) => this.setInputValue('guess', val)}
                    />
                    <button
                        disabled={this.state.buttonDisabled} 
                        onClick={() =>this.sendGuess()}>
                        Guess
                    </button>
                    <button
                        onClick={() =>this.createNewGame()}>
                        Create New
                    </button>
                </div>
                
            </div>
        )
    }
}

export default Game;
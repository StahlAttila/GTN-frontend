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
            if(result && !result.status) {
                UserStore.activeGame = result
                UserStore.loading = false;
                this.setState({
                    lives: result.lives,
                    gameStatus: result.gameStatus,
                    guessDirection: result.guessDirection
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

    getNumberRange(difficulty) {
        if(difficulty === 'EASY') {
            return "0 - 20";
        } else if (difficulty === 'MEDIUM') {
            return "0 - 100";
        } else {
            return "0 - 500";
        }
    }

    async createNewGame() {
        const url = process.env.REACT_APP_API_URL;

        try {
            let res = await fetch(url + '/api/game/new', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': UserStore.token
                },
                body: JSON.stringify({
                    gameType: this.state.gameType,
                    difficulty: this.state.difficulty
                })
            });

            let result = await res.json();
            if(result && !result.status) {
                sessionStorage.setItem("ACTIVEGAME", JSON.stringify(result))
                this.setState({
                    id: result.id,
                    lives: result.lives,
                    gameStatus: result.gameStatus,
                    guessDirection: result.guessDirection,
                    buttonDisabled: false
                })

                if( result.gameStatus != null) {
                    this.setState({
                        buttonDisabled: true
                    })
                }
            }
                
        }
        catch(e) {
            console.log(e);
        }
    } 
    
    render() {
        return (
            <div className="gameContainer">
                <button className="backButton" onClick={() => this.goback()}>Back</button>
                <div className="gameText">
                    <p>ID: {this.state.id}</p>
                    <p>Difficulty: {this.state.difficulty}</p>
                    <p>Range: {this.getNumberRange(this.state.difficulty)}</p>
                    <p>{this.state.guessDirection}</p>
                    <p>Lives: {this.state.lives}</p>
                    <p className="gameStatus">{this.state.gameStatus}</p>
                </div>
                <div>
                    <InputField
                        className="textInput"
                        type="guess"
                        placeholder="Guess a number"
                        value={this.state.guess ? this.state.guess : ""}
                        onChange={(val) => this.setInputValue('guess', val)}
                        onFocus={() => this.setState({guess: ""})}
                    />
                    <button
                        className="submitButton"
                        disabled={this.state.buttonDisabled} 
                        onClick={() =>this.sendGuess()}>
                        Guess
                    </button>
                    <button
                        className="submitButton"
                        onClick={() =>this.createNewGame()}>
                        New Game
                    </button>
                </div>
                
            </div>
        )
    }
}

export default Game;
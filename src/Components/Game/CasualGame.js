import React, { Component } from 'react';
import CreateGame from './CreateGame';
import UserStore from '../../Store/UserStore';

class CasualGame extends Component {
    
    async createCasualGame(diff) {

        const url = process.env.REACT_APP_API_URL

        try {
            let res = await fetch( url + '/api/game/new', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': UserStore.token
                },
                body: JSON.stringify({
                    gameType: "casual",
                    difficulty: diff
                })
            });

            let result = await res.json();
            if(result && !result.status) {
                sessionStorage.setItem("ACTIVEGAME", JSON.stringify(result))
                this.props.history.push("/game/casual")
                
            } else {
                this.resetForm();
                console.log(result)
                alert(result.message);
            }
        }
        catch(e) {
            console.log(e);
        }
    }

    goBack() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="gameContainer">
                <div>
                    <h2>Choose difficulty</h2>
                    <button className="backButton" onClick={() => this.goBack()}>
                        Back
                    </button>
                </div>
                <div className="buttonContainer">
                    <CreateGame 
                    className="homeLink"
                    type="casual"
                    text="Easy Game"
                    onClick={() => this.createCasualGame("easy")}
                />
                <CreateGame
                    className="homeLink" 
                    type="casual"
                    text="Medium Game"
                    onClick={() => this.createCasualGame("medium")}
                />
                <CreateGame 
                    className="homeLink"
                    type="casual"
                    text="Hard Game"
                    onClick={() => this.createCasualGame("hard")}
                />
                </div> 
            </div>
        )
    }
}

export default CasualGame;
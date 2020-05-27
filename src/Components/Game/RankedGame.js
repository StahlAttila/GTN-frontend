import React, { Component } from 'react';
import CreateGame from './CreateGame';
import UserStore from '../../Store/UserStore';

class RankedGame extends Component {

    async createRankedGame(diff) {

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
                    gameType: "ranked",
                    difficulty: diff
                })
            });

            let result = await res.json();
            if(result && !result.status) {
                sessionStorage.setItem("ACTIVEGAME", JSON.stringify(result))
                this.props.history.push("/game/ranked")
                
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
            <div>
                <div>
                    <h2>Choose difficulty</h2>
                    <button onClick={() => this.goBack()}>
                        Go Home
                    </button>
                </div>
               <CreateGame 
                className="easyGame"
                type="ranked"
                text="Easy Game"
                onClick={() => this.createRankedGame("easy")}
               />
               <CreateGame
                className="easyGame" 
                type="ranked"
                text="Medium Game"
                onClick={() => this.createRankedGame("medium")}
               />
               <CreateGame 
                className="easyGame"
                type="ranked"
                text="Hard Game"
                onClick={() => this.createRankedGame("hard")}
               />
            </div>
        )
    }
}

export default RankedGame;
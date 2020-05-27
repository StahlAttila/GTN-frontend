import React, { Component } from 'react';
import UserStore from '../../Store/UserStore';

class LeaderBoard extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            difficulty: "",
            playerList: []
        }
    }

    async componentDidMount() {

        const url = process.env.REACT_APP_API_URL;

        try {
            let res = await fetch(url + '/api/leaderboard/easy', {
                method: 'get',
                headers: {
                    'token' : UserStore.token
                }
            });

            let result = await res.json();
            if(result && !result.status) {   
                this.setState({
                    difficulty: "easy",
                    playerList: result
                })
                
            } else {
                alert(result.message);
            }
        }
        catch(e) {
            console.log(e)
        }
    }

    async changeType(difficulty) {

        const url = process.env.REACT_APP_API_URL;

        try {
            let res = await fetch(url + '/api/leaderboard/' + difficulty, {
                method: 'get',
                headers: {
                    'token' : UserStore.token
                }
            });

            let result = await res.json();
            console.log(result)
            if(result && !result.status) {   
                this.setState({
                    difficulty: difficulty,
                    playerList: result
                })
                
            } else {
                alert(result.message);
            }
        }
        catch(e) {
            console.log(e)
        }
    }

    getPlayerRank(diff, player) {
        if (diff === 'easy') {
            return player.rankedEasy;
        } else if (diff === 'medium') {
            return player.rankedMedium;
        } else {
            return player.rankedHard;
        }
    }

    goBack() {
        this.props.history.push('/');
    }

    render() {
        let diff = this.state.difficulty;
        let playerRank = null;

        return (
            <div>
                <div>
                    <button onClick={() => this.changeType("easy")}>Easy</button>
                    <button onClick={() => this.changeType("medium")}>Medium</button>
                    <button onClick={() => this.changeType("hard")}>Hard</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Player</th>    
                                <th>MMR</th>
                            </tr> 
                        </thead>
                        <tbody>
                            {this.state.playerList.map((player, i) => {
                                return(
                                    <tr key={player.id}>
                                        <td>{i+1}</td>
                                        <td>{player.name}</td>
                                        <td>{this.getPlayerRank(diff, player)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <button onClick={() => this.goBack()}>Go Home</button>
            </div>
        )
    }
}

export default LeaderBoard;
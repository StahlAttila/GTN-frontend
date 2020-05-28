import React, { Component } from 'react';
import UserStore from '../Store/UserStore';
import AllRanks from './Rank/AllRanks';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';

class Homepage extends Component {

    doLogout () {
        sessionStorage.removeItem("USERNAME");
        sessionStorage.removeItem("TOKEN");
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="homeContainer">
                <button className="submitButton logoutButton" onClick={() => this.doLogout()}>Logout</button>
                <h1>Hey there,</h1>
                <h2>{UserStore.username}</h2>
                <h3>Your current ranks:</h3>
                <div>
                    <AllRanks
                        className="ranks"
                        username={UserStore.username} 
                        token={UserStore.token}
                    />
                </div>
                <div className="buttonContainer">
                    <div className="homeButton">
                        <Link className="homeLink" to="/leaderboard">Leader Board</Link>
                    </div>
                    <div className="homeButton">
                        <Link className="homeLink" to="/create-ranked-game">Ranked Game</Link>
                    </div>
                    <div className="homeButton">
                        <Link className="homeLink" to="/create-casual-game">Casual Game</Link>
                    </div>
                    <div className="homeButton">
                        <Link className="homeLink" to="/create-custom-game">Custom Game</Link>
                    </div>      
                </div>               
            </div>
        )
    }
}

export default observer(Homepage);
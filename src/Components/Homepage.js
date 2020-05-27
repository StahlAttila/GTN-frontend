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
            <div>
                <button onClick={() => this.doLogout()}>Logout</button>
                <h1>Welcome,</h1>
                <h2>{UserStore.username}</h2>
                <h3>Current Ranks:</h3>
                <AllRanks
                    username={UserStore.username} 
                    token={UserStore.token}
                />
                <div>
                    <div>
                        <Link to="/leaderboard">Leader Board</Link>
                    </div>
                    <div>
                        <Link to="/create-ranked-game">Ranked Game</Link>
                    </div>
                    <div>
                        <Link to="/create-casual-game">Casual Game</Link>
                    </div>
                    <div>
                        <Link to="/create-custom-game">Custom Game</Link>
                    </div>      
                </div>               
            </div>
        )
    }
}

export default observer(Homepage);
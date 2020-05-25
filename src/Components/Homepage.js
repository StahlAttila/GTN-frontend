import React, { Component } from 'react';
import UserStore from '../Store/UserStore';
import AllRanks from './Rank/AllRanks';
import {observer} from 'mobx-react';

class Homepage extends Component {

    render() {
        return (
            <div>
                <h1>Welcome,</h1>
                <h2>{UserStore.username}</h2>
                <h3>Current Ranks:</h3>
                <AllRanks username={UserStore.username}/>
            </div>
        )
    }
}

export default observer(Homepage);
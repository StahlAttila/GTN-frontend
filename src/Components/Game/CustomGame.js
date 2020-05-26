import React, { Component } from 'react';
import CreateGame from './CreateGame';
import UserStore from '../../Store/UserStore';

class CasualGame extends Component {

    goBack() {
        this.props.history.push("/")
    }

    render() {
        return (
            <div>
                <div>
                    
                    <button onClick={() => this.goBack()}>
                        Go Home
                    </button>
                </div>
                COMING SOON
            </div>
        )
    }
}

export default CasualGame;
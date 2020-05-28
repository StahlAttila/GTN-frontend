import React, { Component } from 'react';

class CasualGame extends Component {

    goBack() {
        this.props.history.push("/")
    }

    render() {
        return (
            <div>
                <div className="gameContainer">
                    <h2> COMING... at sime time in the far far future</h2>
                    <button className="submitButton" onClick={() => this.goBack()}>
                        Go Home
                    </button>
                </div> 
            </div>
        )
    }
}

export default CasualGame;
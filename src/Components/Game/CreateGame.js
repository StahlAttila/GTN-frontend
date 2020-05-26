import React, { Component } from 'react';

class CreateGame extends Component {

    render() {
        return (
            <div>
                <button
                    className={this.props.className}
                    onClick={() => this.props.onClick()}
                >
                    {this.props.text}
                </button>
            </div>
        )
    }
}

export default CreateGame;
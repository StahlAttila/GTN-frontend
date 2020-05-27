import React, { Component } from 'react'
import {observer} from 'mobx-react';

class AllRanks extends Component {

    constructor() {
        super()
        this.state = {
            rankedEasy: null,
            rankedMedium: null,
            rankedHard: null
        }
    }

    async componentDidMount() {
        const username = this.props.username;
        const token = this.props.token;
        const url = process.env.REACT_APP_API_URL;
        try {

            let res = await fetch(url + '/api/ranks/' + username, {
                method: 'get',
                headers: {
                    'token': token
                }
            });

            let result = await res.json();

            if (result) {
                this.setState({
                    rankedEasy: result.rankedEasy,
                    rankedMedium: result.rankedMedium,
                    rankedHard: result.rankedHard
                })
            }
        }

        catch(e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                <p>Easy: {this.state.rankedEasy}</p>
                <p>Medium: {this.state.rankedMedium}</p>
                <p>Hard: {this.state.rankedHard}</p>
            </div>
        )
    }
}

export default observer(AllRanks);
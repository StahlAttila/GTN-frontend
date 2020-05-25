import React, { Component } from 'react'
import UserStore from '../Store/UserStore';

class Rank extends Component {

    constructor() {
        this.state = {
            rank: ""
        }
    }

    componentDidMount() {
        const dif = this.props.difficulty;

        try {
            
            let res = await fetch('http://localhost:8080/leaderboard/' + dif, {
                method: 'post',
                headers: {
                    'token': UserStore.token
                }
            });

            let result = await res.json();
            console.log(result)
            
        }
        catch(e) {
            console.log(e);
            this.resetForm();
        }
    }  

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Rank;
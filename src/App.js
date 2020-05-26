import React from 'react';
import {observer} from 'mobx-react';
import './App.css';
import Login from './Components/Login/Login.js';
import Register from './Components/Register/Register.js';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from './Components/NotFound';
import Homepage from './Components/Homepage';
import PrivateRoute from './Components/PrivateRoute';
import LeaderBoard from './Components/LeaderBoard/LeaderBoard';
import RankedGame from './Components/Game/RankedGame';
import CasualGame from './Components/Game/CasualGame';
import CustomGame from './Components/Game/CustomGame';
import Game from './Components/Game/Game';


class App extends React.Component {

  render() {
    return (
      <Router >
        <div className="app">
          <Switch>
            <PrivateRoute exact path="/" component={Homepage} />
            <PrivateRoute exact path="/create-ranked-game" component={RankedGame} />
            <PrivateRoute exact path="/create-casual-game" component={CasualGame} />
            <PrivateRoute exact path="/create-custom-game" component={CustomGame} />
            <PrivateRoute excat path="/game/ranked" component={Game} />
            <PrivateRoute excat path="/game/casual" component={Game} />
            <PrivateRoute exact path="/leaderboard" component={LeaderBoard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path ="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  
  }
}

export default observer(App);

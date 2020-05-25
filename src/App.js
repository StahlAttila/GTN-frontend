import React from 'react';
import {observer} from 'mobx-react';
import './App.css';
import Login from './Components/Login/Login.js';
import Register from './Components/Register/Register.js';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from './Components/NotFound';
import Homepage from './Components/Homepage';


class App extends React.Component {

  render() {
    return (
      <Router >
        <div className="app">
          <Switch>
            <Route exact path="/" component={Homepage} />
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

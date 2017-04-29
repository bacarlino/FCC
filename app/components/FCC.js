import Calculator from './Calculator';
import Home from './Home';
import Nav from './Nav';
import Pomodoro from './Pomodoro';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import TicTacToe from './TicTacToe';


export default class FCC extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/calculator' component={Calculator} />
            <Route path='/pomodoro' component={Pomodoro} />
            <Route path='/tictactoe' component={TicTacToe} />
            <Route render={function () {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>
    );
  }
}

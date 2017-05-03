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
import Simon from './Simon';


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
            <Route path='/simon' component={Simon} />
            {/* <Route path='/tictactoe' /> */}
            <Route render={function () {
              return <p>Not Found</p>
            }} />
          </Switch>

        </div>
      </Router>
    );
  }
}

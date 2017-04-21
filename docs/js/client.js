import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Calculator from "./pages/Calculator";
import Layout from "./pages/Layout";
import Pomodoro from "./pages/Pomodoro";
import TicTacToe from "./pages/TicTacToe";



const app = document.getElementById('app');

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Layout} />
      <br />
      <Route path="/calculator" component={Calculator} />
      <Route path="/pomodoro" component={Pomodoro} />
      <Route path="/tictactoe" component={TicTacToe} />
    </div>
  </Router>,
  app);

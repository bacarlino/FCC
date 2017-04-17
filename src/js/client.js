import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Calculator from "./pages/Calculator";
import Layout from "./pages/Layout";
import Pomodoro from "./pages/Pomodoro";



const app = document.getElementById('app');

ReactDOM.render(
  <Router>
    <div>
      <Route path="/" component={Layout} />
      <br />
      <Route path="/calculator" component={Calculator} />
      <Route path="/pomodoro" component={Pomodoro} />
    </div>
  </Router>,
  app);

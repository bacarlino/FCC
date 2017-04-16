import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Layout from "./pages/Layout";

import Calculator from "./pages/Calculator";

const app = document.getElementById('app');


const BasicExample = () => (
  <Router>
    <div>
      <Route exact path="/" component={Layout} />
      <Route path="/calculator" component={Calculator} />
    </div>
  </Router>
)



ReactDOM.render(
  <BasicExample />,
  app);

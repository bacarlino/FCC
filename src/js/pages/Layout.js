import React from "react";
import { Link } from "react-router-dom";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to my FCC Projects page!</h1>
        <p>I'm currently exploring react and react-router. Select a project to view:</p>
        <Link to="/"><button>Home</button></Link>
        <Link to="calculator"><button>Calculator</button></Link>
        <Link to="pomodoro"><button>Pomodoro</button></Link>

        <br />
      </div>
    );
  }
}

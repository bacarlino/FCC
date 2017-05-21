import React from 'react';
import { Link, NavLink } from 'react-router-dom';


export default function Nav() {
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/calculator'>Calculator</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/pomodoro'>Pomodoro</NavLink>
      </li>
      <li>
        <a href="/tictactoe">Tic-Tac-Toe(A)</a>
      </li>
      <li>
        <NavLink activeClassName='active' to='/tictactoe/index.html'>Tic-Tac-Toe (react)</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/simon'>Simon</NavLink>
      </li>
    </ul>
  )
}

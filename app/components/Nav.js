import React from 'react';
import { NavLink } from 'react-router-dom';


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
        <NavLink activeClassName='active' to='/simon'>Simon</NavLink>
      </li>
    </ul>

  )
}


// export default class Layout extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Welcome to my FCC Projects page!</h1>
//         <p>I'm currently exploring react and react-router. Select a project to view:</p>
//         <Link to="/"><button>Home</button></Link>
//         <Link to="calculator"><button>Calculator</button></Link>
//         <Link to="pomodoro"><button>Pomodoro</button></Link>
//         <Link to="tictactoe"><button>TicTacToe</button></Link>
//
//         <br />
//       </div>
//     );
//   }
// }

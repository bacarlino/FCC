import React from 'react';
import '../styles/pomodoro.css';


class Counter extends React.Component {
  render() {
    return (
      <div className="counter-display">{this.props.face}</div>
    );
  }
}

class Button extends React.Component {
  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <button className={this.props.name} onClick={this.handleClick.bind(this)}>{this.props.face}</button>
    );
  }
}

class Display extends React.Component {
  handleClick() {
    this.props.onClick();
  }
  render() {
    return (

        <div className="display" onClick={this.handleClick.bind(this)}>{this.props.face}</div>

    );
  }
}

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "Session",
      timerIs: "stopped",
      sessionTime: 25,
      breakTime: 5,
      mainTime: "25:00",
      min: 25,
      sec: 0
    };
  }

  increaseBreakTime() {
    var newTime = ++this.state.breakTime;
    if (this.state.mode === "Break") {
      this.stop();
      this.updateMainTime(newTime);
    }
    this.setState({breakTime: newTime});
  }

  decreaseBreakTime() {
    if (this.state.breakTime > 0) {
      var newTime = --this.state.breakTime;
      if (this.state.mode === "Break") {
        this.stop();
        this.updateMainTime(newTime);
      }
      this.setState({breakTime: newTime});
    }
  }

  increaseSessionTime() {
    var newTime = ++this.state.sessionTime;
    if (this.state.mode === "Session") {
      this.stop();
      this.updateMainTime(newTime);
    }
    this.setState({sessionTime: newTime});
  }

  decreaseSessionTime() {
    if (this.state.sessionTime > 0) {
      var newTime = --this.state.sessionTime;
      if (this.state.mode === "Session") {
        this.stop();
        this.updateMainTime(newTime);
      }
      this.setState({sessionTime: newTime});
    }
  }

  updateMainTime(num) {
    var newTime = num + ":00";
    this.setState({mainTime: newTime, min: num});
  }

  stop() {
    clearInterval(this.timer);
    this.setState({timerIs: "stopped", sec: 0});
  }

  runTimer() {
    var newState;

    if (this.state.timerIs === "stopped") {
      newState = "running";
      this.timer = setInterval(this.decrement.bind(this), 1000);
    } else {
      newState = "stopped";
      clearInterval(this.timer);
    }

    this.setState({timerIs: newState});
  }

  decrement() {
    var newMin = this.state.min,
      newSec = this.state.sec,
      newMainTime;
    if (this.state.sec === 0) {
      if (this.state.min === 0) {
        this.toggleMode();
        return;

      } else {
        newMin = this.state.min - 1;
        newSec = 59;
      }
    } else {
      newSec = this.state.sec - 1;
    }

    newMainTime = newMin.toString() + ":" + (newSec < 10 ? "0" + newSec.toString(): newSec.toString());

    this.setState({mainTime: newMainTime, min: newMin, sec: newSec});
  }

  toggleMode() {
    var newMode,
      newMin;

    if (this.state.mode === "Session") {
      newMode = "Break";
      newMin = this.state.breakTime;
    } else {
      newMode = "Session";
      newMin = this.state.sessionTime;
    }
    this.updateMainTime(newMin);
    this.setState({mode: newMode, min: newMin, sec: 0});
  }

  componentDidMount() {
    this.updateMainTime(this.state.min);
  }

  reset() {
    this.stop();
    this.setState({
      mode: "Session",
      timerIs: "stopped",
      sessionTime: 25,
      breakTime: 5,
      mainTime: "25:00",
      min: 25,
      sec: 0
    });
  }

  render() {
    return (
      <div className="pom-wrapper">
        <h1>Pomodoro Clock</h1>
        <h2>Currently in {this.state.mode} mode</h2>
        <Display face={this.state.mainTime} onClick={this.runTimer.bind(this)}/> {/* </div> */}
        <div className="counter">
          <h3>Session Time</h3>
          <div className='interface'>
            <Button name="down" face="-" onClick={this.decreaseSessionTime.bind(this)}/>
            <Counter face={this.state.sessionTime}/>
            <Button name="up" face="+" onClick={this.increaseSessionTime.bind(this)}/>
          </div>

        </div>
        <div className="counter">
          <h3>Break Time</h3>
          <div className="interface">
            <Button name="down" face="-" onClick={this.decreaseBreakTime.bind(this)}/>
            <Counter face={this.state.breakTime}/>
            <Button name="button up" face="+" onClick={this.increaseBreakTime.bind(this)}/>
          </div>
        </div>
        <br/>
        <Button name="reset" face="Reset" onClick={this.reset.bind(this)} />
      </div>
    );
  }
};

export default Pomodoro

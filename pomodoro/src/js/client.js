var React = require('react');
var ReactDOM = require('react-dom');


class Button extends React.Component {
  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
          <button onClick={this.handleClick.bind(this)}>{this.props.face}</button>
    );
  }
}

class Timer extends React.Component {
  handleClick() {
    this.props.onClick();
  }
  render() {
    return (
      <span onClick={this.handleClick.bind(this)}>{this.props.face}</span>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "session",
      stateIs: "stopped",
      sessionTime: 25,
      breakTime: 5,
      mainTime: "25:00",
      min: 25,
      sec: 0
    };

    this.increaseBreakTime = this.increaseBreakTime.bind(this);
    this.decreaseBreakTime = this.decreaseBreakTime.bind(this);
    this.increaseSessionTime = this.increaseSessionTime.bind(this);
    this.decreaseSessionTime = this.decreaseSessionTime.bind(this);
    this.updateMainTime = this.updateMainTime.bind(this);
    this.toggleStateIs = this.toggleStateIs.bind(this);
  }

  increaseBreakTime() {
    var newTime = ++this.state.breakTime;
    if (this.state.mode === "break") {
      this.updateMainTime(newTime);
    }
    this.setState({
        breakTime: newTime
    });

  }
  decreaseBreakTime() {
    if (this.state.breakTime > 0) {
      var newTime = --this.state.breakTime;
      if (this.state.mode === "break") {
        this.updateMainTime(newTime);
      }
      this.setState({
          breakTime: newTime
      });
    }
  }

  increaseSessionTime() {
    var newTime = ++this.state.sessionTime;
    if (this.state.mode === "session") {
      this.updateMainTime(newTime);
    }
    this.setState({
        sessionTime: newTime
    });
  }

  decreaseSessionTime() {
    if (this.state.sessionTime > 0) {
      var newTime = --this.state.sessionTime;
      if (this.state.mode === "session") {
        this.updateMainTime(newTime);
      }
      this.setState({
          sessionTime: newTime
      });
    }
  }

  updateMainTime(num) {
    var newTime = num + ":00";
    this.setState({
      mainTime: newTime
    });
  }

  toggleStateIs() {
    var newState;

    if (this.state.stateIs === "stopped") {
      newState = "running";
      this.timer = setInterval(this.runTimer, 1000);
      console.log("this is", this);
    } else {
      newState = "stopped";
      clearInterval(this.timer);
      console.log("this is", this);
    }
    console.log("Toggle state to", newState);
    this.setState({
      stateIs: newState
    });
  }

  runTimer() {
    console.log("runTimer");
  }

  clearTimer() {
  }

  render() {
    return (
      <div>
        <h1>FCC POMODORO CLOCK</h1>
        <Button face="-" onClick={this.decreaseBreakTime} />
        <Timer face={this.state.breakTime} />
        <Button face="+" onClick={this.increaseBreakTime} />
        <Button face="-" onClick={this.decreaseSessionTime} />
        <Timer face={this.state.sessionTime} />
        <Button face="+" onClick={this.increaseSessionTime} />
        <br />
        <div>
          <Timer face={this.state.mainTime} onClick={this.toggleStateIs} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('app')
);

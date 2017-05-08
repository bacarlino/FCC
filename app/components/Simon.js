import React from 'react';
import green from '../audio/green.mp3';
import red from '../audio/red.mp3';
import yellow from '../audio/yellow.mp3';
import blue from '../audio/blue.mp3';
import buzzer from '../audio/buzzer.mp3';


class Pad extends React.Component {
  constructor(props) {
    super(props);

    this.audio = {
      green: green,
      red: red,
      yellow: yellow,
      blue: blue
    }

    this.state = {
      on: false,
      audio: false,
      triggered: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.triggered) {
      this.activate();
    }
  }

  activate() {
    document.getElementById(this.props.id + '-audio').play();
    this.setState(function() {
      return {on: true, audio: true, triggered: false};
    });
    setTimeout(() => {
      return this.setState(function() {
        return {on: false, audio: false};
      });
    }, 420)
  }

  handleClick(e) {
    e.persist();
    if (!e.nativeEvent.isTrusted) {
      // document.getElementById(this.props.id + '-audio').play();
      this.activate();
    } else {
      if (!this.props.padLock && this.props.userResponse) {
        // document.getElementById(this.props.id + '-audio').play();
        this.activate();
        this.props.onClick(this.props.id);
      }
    }
  }

  render() {
    return (
      <div
        id={this.props.id}
        className={`simon-pad ${this.state.on?'on':'off'}`}
        onClick={this.handleClick.bind(this)}>

        {/* {this.state.audio && */}
        <audio id={this.props.id + '-audio'}>
          <source src={this.audio[this.props.id]} type="audio/mpeg" />
          Audio not supported by your browser.
        </audio>
        {/* } */}
      </div>
    );
  }
}


export default class Simon extends React.Component {

  constructor(props) {
    super(props);
    this.padList = ['green', 'red', 'yellow', 'blue'];

    this.state = {
     on: false,
     strict: false,
     start: false,
     count: 0,
     padLock: false,
     cpuSeq: [],
     userSeq: [],
     cpuClick: false,
     userResponse: false,
   };

    this.toggleOn = this.toggleOn.bind(this);
    this.toggleStart = this.toggleStart.bind(this);
    this.toggleStrict = this.toggleStrict.bind(this);
    this.padClicked = this.padClicked.bind(this);
    this.evaluate = this.evaluate.bind(this);
  }

  resetState() {
    clearTimeout(this.buzzer);
    clearTimeout(this.timer);
    clearInterval(this.cpuPlay);
    this.setState(function () {
      return {
       on: false,
       strict: false,
       start: false,
       count: 0,
       padLock: false,
       cpuSeq: [],
       userSeq: [],
       cpuClick: false,
       userResponse: false,
       buzzer: false
     };
    });
  }

  restartState() {
    clearTimeout(this.buzzer);
    clearTimeout(this.timer);
    clearInterval(this.cpuPlay);
    console.log('restartState calling setState', this.state);
    this.setState(function () {
      return {
       count: 0,
       padLock: false,
       cpuSeq: [],
       userSeq: [],
       cpuClick: false,
       userResponse: false,
       buzzer: false
     };
   }, this.runGame);
    console.log('exit restartState', this.state);
  }



  toggleOn() {
    if (this.state.on) {
      this.resetState();
    } else {
      this.setState(function () {
        return !this.state.on && {on: true};
      });
    }
  }

  toggleStrict() {
    let strict = this.state.strict;
    if (this.state.on && !this.state.strict) {
      strict = true;
    } else if (this.state.strict) {
      strict = false;
    }
    this.setState(function () {
      return {strict: strict};
    });
  }

  toggleStart() {
    if (this.state.on) {
      if (!this.state.start) {
        this.runGame();
        this.setState(function () {
          return {start: true};
        });
      } else {
        this.restartState();
      }
    }
  }

  togglePadLock() {
    this.setState(function () {
      return this.state.padLock?{padLock: false}:{padLock: true};
    });
  }

  toggleUserResponse() {
    this.setState(function () {
      return this.state.userResponse?{userResponse: false}:{userResponse: true};
    });
  }

  userResponseOn() {
    this.setState(function () {
      return {userResponse: true};
    });
  }

  userResponseOff() {
    this.setState(function () {
      return {userResponse: false};
    });
  }



  clearUserSeq() {
    this.setState(function () {
      return {userSeq: []};
    });
  }

  clearCpuSeq() {
    this.setState(function () {
      return {cpuSeq: [], count: 0};
    });
  }

  padClicked(id) {
    let userSeq = this.state.userSeq;
    if (this.state.userResponse) {
      clearTimeout(this.timer);
      userSeq.push(id);
      this.setState(function () {
        return {
          userSeq: userSeq
        };
      });
      this.evaluate();
    }
  }

  userInput() {
    this.userResponseOn();
    this.timer = setTimeout(this.playBuzzer.bind(this), 3000);
  }

  evaluate() {
    let userSeq = this.state.userSeq;
    let cpuSeq = this.state.cpuSeq;

    this.userResponseOff();

    for (let i = 0; i < userSeq.length; i++) {
      if (userSeq[i] === cpuSeq[i]) {
        continue;
      } else {
        clearTimeout(this.timer);
        this.playBuzzer();
        return;
      }
    }
    if (userSeq.length === cpuSeq.length) {
      setTimeout(this.runGame.bind(this), 700);
    } else {
      this.userInput();
    }
  }

  addPad() {
    const padList = ['green', 'red', 'yellow', 'blue'];
    let cpuSeq = this.state.cpuSeq;

    cpuSeq.push(padList[Math.floor(Math.random() * this.padList.length)]);

    this.setState(function () {
      return {
        cpuSeq: cpuSeq,
        count: cpuSeq.length,
      }
    })
  }

  clickPad(id) {
    document.getElementById(id).click();
  }

  playCpuSeq() {
    let seq = this.state.cpuSeq;
    let i = 0;

    this.togglePadLock();
    this.cpuPlay = setInterval(() => {

      if (i < seq.length) {
        this.clickPad(seq[i]);
        i++;
      } else {
        clearInterval(this.cpuPlay);
        i = 0;
        this.togglePadLock();
        this.userInput();
      }
    }, 470);
  }

  playBuzzer() {
    this.userResponseOff();
    clearTimeout(this.timer);
    this.setState(function () {
      return {buzzer: true};
    });
    this.buzzer = setTimeout(() => {
      if (!this.state.strict) {
        this.clearUserSeq();
        this.playCpuSeq();
      } else {
        this.restartState();
      }
      this.setState(function () {
        return {buzzer: false};
      });
    }, 2000);
  }

  runGame() {
    this.clearUserSeq();
    console.log('call addPad');
    this.addPad();
    console.log('call playCpuSeq');
    this.playCpuSeq();
  }

  render() {
    console.log('timer =', this.timer, 'cpuPlay =', this.cpuPlay);

    return (
      <div id='simon'>
        <h1>FreeCodeCamp Simon</h1>
        <p>This app is not optimized for all browsers and may appear distorted</p>
        <div id='simon-container'>
          <div className='row'>
            <Pad
              onClick={this.padClicked}
              id='green'
              padLock={this.state.padLock}
              userResponse={this.state.userResponse}

            />
            <Pad
              onClick={this.padClicked}
              id='red'
              padLock={this.state.padLock}
              userResponse={this.state.userResponse}
            />
          </div>
          <div className='row'>
            <Pad
              onClick={this.padClicked}
              id='yellow'
              padLock={this.state.padLock}
              userResponse={this.state.userResponse}
            />
            <Pad
              onClick={this.padClicked}
              id='blue'
              padLock={this.state.padLock}
              userResponse={this.state.userResponse}
            />
          </div>
          <div className='center-area'>
            <h1>Simon</h1>
            <div className='controls'>
              <div className='control-top'>
                <div className='count'>{this.state.on?this.state.count:''}</div>
                <button className={this.state.start?'start-on':'start'}  onClick={this.toggleStart}>Start</button>
                <button className={this.state.strict?'strict-on':'strict'} onClick={this.toggleStrict}>Strict</button>
              </div>
              <button className={!this.state.on?'on-off':'on-off-on'} onClick={this.toggleOn}>ON/OFF</button>
            </div>
            {this.state.buzzer &&
              <audio autoPlay>
                <source src={buzzer} type="audio/mpeg" />
                Audio not supported in by your browser.
              </audio>
            }
          </div>
        </div>
        {/* <button onClick={this.toggleUserResponse.bind(this)}>UNLOCK PADS</button>
          <button onClick={this.runGame.bind(this)}>RUN GAME</button>
        <button onClick={this.playCpuSeq.bind(this)}>PLAY SEQ</button> */}
      </div>
    );
  }
}

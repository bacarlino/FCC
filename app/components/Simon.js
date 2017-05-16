import React from 'react';
import padSounds from '../audio/padsounds2.mp3';
import '../styles/simon.css';

const audio = {
  stopTime: 0,
  green: {
    start: 0.9,
    length: 0.4
  },
  red: {
    start: 2.4,
    length: 0.4
  },
  yellow: {
    start: 3.9,
    length: 0.4
  },
  blue: {
    start: 5.4,
    length: 0.4
  },
  buzzer: {
    start: 6.9,
    length: 1.6
  }
}

class Pad extends React.Component {
  constructor(props) {
    super(props);

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
    audio.stopTime = audio[this.props.id].start + audio[this.props.id].length;
    audio.soundEffects.currentTime = audio[this.props.id].start;
    audio.soundEffects.play();
    this.setState(function() {
      return {on: true};
    }, () => {
      setTimeout(() => {
        return this.setState(function() {
          return {on: false};
        }, () => {
        });
      }, 420);
    });
  }

  handleClick(e) {
    e.persist();
    if (!e.nativeEvent.isTrusted) {
      this.activate();
    } else {
      if (!this.props.padLock && this.props.userResponse) {
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
    this.setState(function () {
      return {
       start: false,
       count: 0,
       padLock: false,
       cpuSeq: [],
       userSeq: [],
       cpuClick: false,
       userResponse: false,
       buzzer: false
     };
   },);
  }

  toggleOn() {
    if (this.state.on) {
      this.resetState();
    } else {
      this.setState(function () {
        return !this.state.on && {on: true};
      }, this.audioInit.bind(this));
    }
  }

  audioInit() {
    if (!this.state.audioInit) {
      audio.soundEffects = document.createElement("audio");
      audio.soundEffects.src = padSounds;
      audio.soundEffects.stopTime = 0;
      audio.soundEffects.play();
      audio.soundEffects.addEventListener('timeupdate', function () {
        if (audio.soundEffects.currentTime >= audio.stopTime) {
          audio.soundEffects.pause();

        }
      });
      this.setState(function () {
        return {audioInit: true};
      })
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

      };
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
      setTimeout(this.runGame.bind(this), 800);
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

  playVictory() {

  }

  playBuzzer() {
    this.userResponseOff();
    clearTimeout(this.timer);

    audio.stopTime = audio.buzzer.start + audio.buzzer.length;
    audio.soundEffects.currentTime = audio.buzzer.start;
    console.log('Playing buzzer at', audio.buzzer.start);
    console.log('stopTime set to', audio.stopTime);
    audio.soundEffects.play();

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
    }, 1500);
  }

  runGame() {
    this.clearUserSeq();
    this.addPad();
    this.playCpuSeq();
  }

  render() {
    return (
      <div id='simon'>
        <h1>Simon</h1>
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
          </div>
        </div>
      </div>
    );
  }
}

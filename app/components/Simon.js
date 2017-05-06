import React from 'react';

class Pad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      on: false,
      triggered: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.triggered) {
      this.turnOnLight();
    }
  }

  turnOnLight() {
    this.setState(function() {
      return {on: true, triggered: false};
    });
    setTimeout(() => {
      return this.setState(function() {
        return {on: false};
      });
    }, 420)
  }

  handleClick(e) {
    e.persist();
    if (!e.nativeEvent.isTrusted) {
      this.turnOnLight();
    } else {
      if (!this.props.padLock) {
        this.turnOnLight();
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

    this.default = {
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


    this.state = this.default;

    this.toggleOn = this.toggleOn.bind(this);
    this.toggleStart = this.toggleStart.bind(this);
    this.toggleStrict = this.toggleStrict.bind(this);
    this.padClicked = this.padClicked.bind(this);
    this.evaluate = this.evaluate.bind(this);

  }


  resetState() {
    clearTimeout(this.timer);
    console.log('setting defaults', this.default)
    this.setState(function () {
      return this.default;
    });
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
    this.setState(function () {
      return this.state.strict && this.state.on?{strict: false}:{strict: true};
    });
  }

  toggleStart() {
    if (this.state.on) {
      this.runGame();
      this.setState(function () {
        return this.state.start?{start: false}:{start: true};
      });
    }
  }

  togglePadLock() {
    console.log('Toggling padLock', !this.state.padLock);
    this.setState(function () {
      return this.state.padLock?{padLock: false}:{padLock: true};
    });
  }

  toggleUserResponse() {
    console.log('Toggling userResponse', !this.state.userResponse);
    this.setState(function () {
      return this.state.userResponse?{userResponse: false}:{userResponse: true};
    });
  }


  padClicked(id) {
    console.log(id, 'pad callback', this);
    let userSeq = this.state.userSeq;
    clearTimeout(this.timer);

    if (this.state.userResponse) {
      this.timer = setTimeout(this.evaluate.bind(this), 3000);
      userSeq.push(id);
      this.setState(function () {
        return {
          userSeq: userSeq
        };
      });

      if (this.state.cpuSeq.length === this.state.userSeq.length) {
        clearTimeout(this.timer);
        this.evaluate();
      }
    }
  }

  addPad() {
    console.log('addPad');
    const padList = ['green', 'red', 'yellow', 'blue'];
    let cpuSeq = this.state.cpuSeq;

    cpuSeq.push(padList[Math.floor(Math.random() * padList.length)]);

    console.log('Adding to cpuSeq', cpuSeq)
    this.setState(function () {
      return {
        cpuSeq: cpuSeq,
        count: cpuSeq.length,
        userSeq: []
      }
    })
  }

  userInput() {
    console.log('Waiting for user input');
    this.toggleUserResponse();
    this.timer = setTimeout(this.evaluate.bind(this), 3000);

  }

  evaluate() {
    this.toggleUserResponse();
    console.log('EVALUATE - ',this.state.userSeq, this.state.cpuSeq);
    for (let i = 0; i < this.state.cpuSeq.length; i++) {
      if (this.state.userSeq[i] === this.state.cpuSeq[i]) {
        continue;
      } else {
        this.playBuzzer();
        return;
      }
    }
    console.log('MATCH!');
    setTimeout(this.runGame.bind(this), 700);
  }

  clickPad(id) {
    document.getElementById(id).click();
  }

  playCpuSeq() {
    let seq = this.state.cpuSeq;
    let i = 0;

      this.togglePadLock();
      var cpuPlay = setInterval(() => {
        if (i < seq.length) {
        this.clickPad(seq[i]);
        i++;
      } else {
        clearInterval(cpuPlay);
        this.togglePadLock();
        this.userInput();
      }
    }, 470);
    //
  }

  playBuzzer() {
    console.log('BUZZZZZZZZZ');
  }

  runGame() {
    this.addPad();
    this.playCpuSeq();
  }

  render() {
    console.log('Simon Rendering', this.state)
    return (
      <div id='simon'>
        <h1>FreeCodeCamp Simon</h1>
        <p>This app is not optimized for all browsers and may appear distorted</p>
        <div id='simon-container'>
          <div className='row'>
            <Pad
              onClick={this.padClicked}
              id='green'
              triggered={this.state.cpuPick === 'green'}
              padLock={this.state.padLock}
              cpuClick={this.state.cpuClick}
            />
            <Pad
              onClick={this.padClicked}
              id='red'
              triggered={this.state.cpuPick === 'red'}
              padLock={this.state.padLock}
            />
          </div>
          <div className='row'>
            <Pad
              onClick={this.padClicked}
              id='yellow'
              triggered={this.state.cpuPick === 'yellow'}
              padLock={this.state.padLock}
            />
            <Pad
              onClick={this.padClicked}
              id='blue'
              triggered={this.state.cpuPick === 'blue'}
              padLock={this.state.padLock}
            />
          </div>
          <div className='center-area'>
            <h1>Simon</h1>
            <div className='controls'>
              <div className='control-top'>

                <div className='count'>{this.state.on?this.state.count:''}</div>
                <button className='start' onClick={this.toggleStart}>Start</button>
                <button className='strict' onClick={this.toggleStrict}>Strict</button>
              </div>
              <button className='on-off' onClick={this.toggleOn}>ON/OFF</button>
            </div>
          </div>
        </div>
        <button onClick={this.addPad.bind(this)}>ADD PAD</button>
        <button onClick={this.runGame.bind(this)}>RUN GAME</button>
        <button onClick={this.playCpuSeq.bind(this)}>PLAY SEQ</button>
      </div>
    );
  }
}

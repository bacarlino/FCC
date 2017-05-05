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

  handleClick() {
    this.turnOnLight();
    this.props.onClick(this.props.id);
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

    this.state = {
      on: false,
      strict: false,
      start: false,
      count: 0,
      cpuSequence: [],
      userSequence: [],
      cpuPick: ''
    }
    this.toggleOn = this.toggleOn.bind(this);
    this.toggleStart = this.toggleStart.bind(this);
    this.toggleStrict = this.toggleStrict.bind(this);
    this.padClicked = this.padClicked.bind(this);
  }

  toggleOn() {
    this.setState(function() {
      return this.state.on?{on: false}:{on: true};
    });
  }

  toggleStrict() {
    this.setState(function() {
      return this.state.strict?{strict: false}:{strict: true};
    });
  }

  toggleStart() {
    if (this.state.on) {
      runGame();
      this.setState(function() {
        return this.state.start?{start: false}:{start: true};
      });
    }
  }

  padClicked(id) {
    console.log(id, 'Pad Clicked!')
  }

  randomPad() {
    const padList = ['green', 'red', 'yellow', 'blue'];
    return padList[Math.floor(Math.random() * padList.length)];
  }

  turnOnLight() {

  }

  gameRound() {

  };

  runGame() {
    let pad;
    let cpuSeq = this.state.cpuSequence;
    let userSeq = this.state.userSequence;

    pad = this.randomPad();
    cpuSeq.push(pad);
    this.setState(function() {
      return {
        cpuSequence: cpuSeq,
        count: cpuSeq.length
      };
    });

    // Light up chosen pad, play sound,

    // Wait for user to select a pad
    // if user inputs correct sequence --> increment count, add new random choice to sequence
    // if users choice != sequence --> Error sound
    // if error and if not strict (!strict) replay sequence to user and wait for input
    // if error and if strict, start over at count of 1 and play new choice
  }

  render() {

    console.log('Simon Rendering - this.state =', this.state);
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
            />
            <Pad
              onClick={this.padClicked}
              id='red'
              triggered={this.state.cpuPick === 'red'}
            />
          </div>
          <div className='row'>
            <Pad
              onClick={this.padClicked}
              id='yellow'
              triggered={this.state.cpuPick === 'yellow'}
            />
            <Pad
              onClick={this.padClicked}
              id='blue'
              triggered={this.state.cpuPick === 'blue'}
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
        <button onClick={this.runGame.bind(this)}>TEST</button>
      </div>
    );
  }
}

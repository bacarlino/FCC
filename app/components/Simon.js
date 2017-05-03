import React from 'react';



class Pad extends React.Component {
  render() {
    return (
      <div className={`simon-pad ${this.props.color}`}></div>
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
      count: 0
    }
  }

  render() {
    return (
      <div id='simon'>
        <h1>FreeCodeCamp Simon</h1>
        <p>This app has not been optimized for all browsers and may appear distorted</p>
        <div id='simon-container'>
          <div className='row'>
            <Pad color='green' />
            <Pad color='red' />
          </div>
          <div className='row'>
            <Pad color='yellow' />
            <Pad color='blue' />
          </div>

          <div className='center-area'>
            <h1>Simon</h1>
            <div className='controls'>
              <div className='control-top'>
                <div className='count'>Count</div>
                <button className='start'>Start</button>
                <button className="strict">Strict</button>
              </div>
              <button className="on-off">ON/OFF</button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

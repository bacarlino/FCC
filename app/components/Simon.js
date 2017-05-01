import React from 'react';

class Pad extends React.Component {
  render() {
    return (
      <div
        // style={{'backgroundColor': this.props.color}}
        className={`simon-pad ${this.props.color}`}></div>
    );
  }
}

export default class Simon extends React.Component {
  render() {
    return (
      <div id='simon'>
        <h1>FCC Simon</h1>
        <div id='simon-container'>
          <div className='row'>
            <Pad color='green' />
            <Pad color='red' />
          </div>
          <div className='row'>
            <Pad color='yellow' />
            <Pad color='blue' />
          </div>
          <div className='center-area'><h1>Simon</h1></div>
        </div>
      </div>
    );
  }
}

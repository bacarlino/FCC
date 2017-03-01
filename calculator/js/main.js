var React = require('react');
var ReactDOM = require('react-dom');


class Display extends React.Component {
  render() {
    console.log('rendering Display');
    return (
      <div id="calc-display">
        <div id="top-disp">{this.props.total}</div>
        <div id="bottom-disp">{this.props.equation}</div>
      </div>
    );
  }
}


class Button extends React.Component {
  handleClick() {
    this.props.onClick(this.props.face);
  }

  render() {
    return (
      <td rowSpan={this.props.rowspan}
          colSpan={this.props.colspan}>
          <button onClick={this.handleClick.bind(this)}>{this.props.face}</button>
      </td>
    );
  }
}


class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screenValue: '0',
      equation: '',
      prevEntry: '',
      nextClear: false
    };

    this.numberPress = this.numberPress.bind(this);
    this.operatorPress = this.operatorPress.bind(this);
    this.calculate = this.calculate.bind(this);
    this.clearScreen = this.clearScreen.bind(this);
    this.undo = this.undo.bind(this);
    this.toggleClearTrue = this.toggleClearTrue.bind(this);
    this.toggleClearFalse = this.toggleClearFalse.bind(this);
  }

  numberPress(value) {
    var re = /[-+*/]/;
    var newEquation = 'Error';
    var newPrevEntry = 'Error';

    if (this.state.nextClear) {
      newEquation = value;
      newPrevEntry = value;
      this.toggleClearFalse();
    } else {

        if (re.test(this.state.prevEntry)) {
          newPrevEntry = value;
        } else {

          if (this.state.prevEntry.length >= 13) {
            newPrevEntry = this.state.prevEntry;
          } else {
            newPrevEntry = this.state.prevEntry + value;
            }
          }
          if (this.state.equation.length >= 28) {
            newEquation = this.state.equation;
          } else {
            newEquation = this.state.equation + value
          }
        }

    this.setState({
      screenValue: newPrevEntry,
      equation: newEquation,
      prevEntry: newPrevEntry
    });
  }

  operatorPress(value) {
    var newEquation = this.state.equation + value;

    if(this.state.nextClear) {
      newEquation = value;
      this.toggleClearFalse();
    }

    this.setState({
      screenValue: value,
      equation: newEquation,
      prevEntry: value
    });
  }

  calculate(value) {
    var result = this.state.equation ? eval(this.state.equation): '0';
    var newEquation;

    if (result !== '0') {
      newEquation = this.state.equation + value + result;
    } else {
      newEquation = ""
    }

    this.setState({
      screenValue: result,
      equation: newEquation,
      nextClear: true
    });
  }

  clearScreen() {
    this.setState({
      screenValue: 0,
      equation: '',
      prevEntry: []
    });
  }

  toggleClearTrue() {
    this.setState({
      nextClear: true
    });
  }

  toggleClearFalse() {
    this.setState({
      nextClear: false
    });
  }

  undo() {
    if (this.state.nextClear) {
      this.clearScreen();
      this.toggleClearFalse();
    }

    if (this.state.screenValue.length === 1) {
      newScreenValue = '0';
      } else {
        var newScreenValue = this.state.screenValue.slice(0, -1);
      }
    var newEquation = this.state.equation.slice(0, -1);


    this.setState({
      screenValue: newScreenValue,
      prevEntry: '',
      equation: newEquation
    });
  }

  render() {
    return (
      <div className="container text-center" id="calc-app">
        <div className="row">
          <div className="col-md-offset-3 col-md-6">
            <table id="calc-body">
              <tbody>
                <tr>
                  <td colSpan="4">
                    <Display total={this.state.screenValue}
                             equation={this.state.equation}
                             clear={this.state.nextClear}
                             callback1={this.clearScreen}
                             callback2={this.toggleClearFalse}
                             />
                  </td>
                </tr>
                <tr>
                  <Button face="AC" onClick={this.clearScreen} />
                  <Button face="Undo" onClick={this.undo} />
                  <Button face="/" onClick={this.operatorPress} />
                  <Button face="*" onClick={this.operatorPress} />
                </tr>
                <tr>
                  <Button face="7" onClick={this.numberPress} />
                  <Button face="8" onClick={this.numberPress} />
                  <Button face="9" onClick={this.numberPress} />
                  <Button face="-" onClick={this.operatorPress} />
                </tr>
                <tr>
                  <Button face="4" onClick={this.numberPress} />
                  <Button face="5" onClick={this.numberPress} />
                  <Button face="6" onClick={this.numberPress} />
                  <Button face="+" onClick={this.operatorPress} />
                </tr>
                <tr>
                  <Button face="1" onClick={this.numberPress} />
                  <Button face="2" onClick={this.numberPress} />
                  <Button face="3" onClick={this.numberPress} />
                  <Button face="=" rowspan='2' onClick={this.calculate} />
                </tr>
                <tr>
                  <Button colspan='2' face='0' onClick={this.numberPress} />
                  <Button face="." onClick={this.numberPress} />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('app')
);

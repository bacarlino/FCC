var React = require('react');
var ReactDOM = require('react-dom');

class Display extends React.Component {
  render() {
    return (
      <div id="calc-display">
        <div id="top-disp">{this.props.total}</div>
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
      <td rowSpan={this.props.rowspan} colSpan={this.props.colspan}>
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
      nextClear: false
    };

    this.numberPress = this.numberPress.bind(this);
    this.operatorPress = this.operatorPress.bind(this);
    this.calculate = this.calculate.bind(this);
    this.clearScreen = this.clearScreen.bind(this);
    this.undo = this.undo.bind(this);
    this.toggleClearFalse = this.toggleClearFalse.bind(this);
  }

  clearScreen() {
    this.setState({
      screenValue: '0',
      equation: ''
    });
  }

  toggleClearFalse() {
    this.setState({
      nextClear: false
    });
  }

  numberPress(value) {
    var newEquation;

    if (this.state.nextClear) {
      newEquation = value;
      this.toggleClearFalse();
    } else {
       newEquation = this.state.equation + value
    }

    this.setState({
      screenValue: newEquation,
      equation: newEquation
    });
  }


  operatorPress(value) {
    var newEquation = this.state.equation + value;

    if(this.state.nextClear) {

      if (this.state.screenValue === 'Error') {
        newEquation = value;
      } else {
      newEquation = this.state.screenValue + value;
      }

      this.toggleClearFalse();
    }

    this.setState({
      screenValue: newEquation,
      equation: newEquation
    });
  }

  calculate(value) {
    var newScreenValue;

    try {
      newScreenValue = eval(this.state.equation);
    } catch(error) {
      newScreenValue = "Error";
    }

    this.setState({
      screenValue: newScreenValue,
      nextClear: true
    });
  }

  undo() {
    var newScreenValue,
        newEquation = this.state.equation;

    if (this.state.nextClear) {
      this.toggleClearFalse();
    } else {
      newEquation = newEquation.slice(0, -1);
    }

    newScreenValue = newEquation.length > 0 ? newEquation: '0';

    this.setState({
      screenValue: newScreenValue,
      equation: newEquation
    });
  }

  render() {
    return (
      <div className="text-center" id="calc-app">
        <div className="row">
          <div className="col-md-offset-3 col-md-6">
            <div id="calc-shell">
              <table id="calc-body">
                <tbody>
                  <tr>
                    <td colSpan="4">
                      <Display total={this.state.screenValue}
                        equation={this.state.equation}/>
                    </td>
                  </tr>
                  <tr>
                    <Button face="C" onClick={this.clearScreen} />
                    <Button face="&#8630;" onClick={this.undo} />
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
      </div>
    );
  }
}

export default Calculator

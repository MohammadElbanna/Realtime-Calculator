import React, { Component } from "react";
import CalculatorButton from "./CalculatorButton.js";
import ResultDisplay from "./ResultDisplay.js";
import LogPanel from "./LogPanel.js";
import styles from "./App.css";
import utils from "./service.js";
import io from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operationStream: [],
      firstOperand: "0",
      secondOperand: undefined,
      operator: undefined
    };
    this.socket = io();
    this.socket.on("operation", this.updateOperationList);
  }

  componentDidMount() {
    //TODO: this should be changed to window.location.origin
    fetch("/initialOp")
      .then(response => response.json())
      .then(operations => {
        this.setState(currState => ({ operationStream: operations }));
      })
      .catch(error => console.log(error));
  }

  sendOperation = msg => {
    this.socket.emit("operation", {
      msg: msg,
      key: Date.now()
    });
  };

  updateOperationList = op => {
    this.setState(currentState => {
      var newOperatrions = currentState.operationStream;
      if (newOperatrions.length === 10) {
        newOperatrions = newOperatrions.filter((x, index) => index !== 0);
      }
      return {
        operationStream: newOperatrions.concat([op])
      };
    });
  };

  handleButtonClick = event => {
    var buttonText = event.target.textContent;

    if (utils.isNumberButton(buttonText)) {
      if (!this.state.operator) {
        this.setState(currentState => ({
          firstOperand:
            currentState.firstOperand && currentState.firstOperand !== "0"
              ? currentState.firstOperand + buttonText
              : buttonText
        }));
      } else {
        this.setState(currentState => ({
          secondOperand:
            currentState.secondOperand && currentState.secondOperand !== "0"
              ? currentState.secondOperand + buttonText
              : buttonText
        }));
      }
    } else if (utils.isOperatorButton(buttonText)) {
      if (this.state.secondOperand) {
        let result = this.commitOperation();
        this.setState({
          firstOperand: result,
          secondOperand: undefined,
          operator: buttonText
        });
      } else {
        this.setState({ operator: buttonText });
      }
    } else if (utils.isEqualButton(buttonText)) {
      if (this.state.secondOperand !== undefined) {
        let result = this.commitOperation();
        this.setState({
          firstOperand: result,
          secondOperand: undefined,
          operator: undefined
        });
      }
    } else if (utils.isACButton(buttonText)) {
      // AC button
      this.setState({
        firstOperand: "0",
        secondOperand: undefined,
        operator: undefined
      });
    }
    event.stopPropagation();
  };

  commitOperation = () => {
    let result = utils.calculate(
      this.state.firstOperand,
      this.state.secondOperand,
      this.state.operator
    );
    let msg = utils.stringifyOperation(
      this.state.firstOperand,
      this.state.secondOperand,
      this.state.operator,
      result
    );
    this.sendOperation(msg);
    this.updateOperationList({ msg: msg, key: Date.now() });
    return result;
  };

  render() {
    const resultDisplayNumber =
      this.state.secondOperand !== undefined
        ? this.state.secondOperand
        : this.state.firstOperand;

    return (
      <div className={styles.gridContainer} onClick={this.handleButtonClick}>
        <ResultDisplay resultDisplayNumber={resultDisplayNumber} />

        <CalculatorButton text="AC" acButton />
        <CalculatorButton text="÷" operationButton />

        <CalculatorButton text="7" />
        <CalculatorButton text="8" />
        <CalculatorButton text="9" />
        <CalculatorButton text="×" operationButton />

        <CalculatorButton text="4" />
        <CalculatorButton text="5" />
        <CalculatorButton text="6" />
        <CalculatorButton text="-" operationButton />

        <CalculatorButton text="1" />
        <CalculatorButton text="2" />
        <CalculatorButton text="3" />
        <CalculatorButton text="+" operationButton />

        <CalculatorButton text="0" zeroButton />
        <CalculatorButton text="=" operationButton />

        <LogPanel operations={this.state.operationStream} />
      </div>
    );
  }
}

export default App;

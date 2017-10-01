import React, { Component } from "react";
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
    this.socket = io("http://localhost:4000/");
    this.socket.on("operation", this.updateOperationList);
  }

  componentDidMount() {
    //TODO: this should be changed to window.location.origin
    fetch("http://localhost:4000" + "/initialOp")
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

  render() {
    return (
      <div className={styles.gridContainer} onClick={this.handleButtonClick}>
        <div className={styles.resultDisplay}>
          <span>
            {this.state.secondOperand !== undefined ? (
              this.state.secondOperand
            ) : (
              this.state.firstOperand
            )}
          </span>
        </div>

        <button className={`${styles.acButton} ${styles.calcButton}`}>
          AC
        </button>
        <button className={`${styles.calcButton} ${styles.operationButton}`}>
          ÷
        </button>

        <button className={styles.calcButton}>7</button>
        <button className={styles.calcButton}>8</button>
        <button className={styles.calcButton}>9</button>
        <button className={`${styles.calcButton} ${styles.operationButton}`}>
          ×
        </button>

        <button className={styles.calcButton}>4</button>
        <button className={styles.calcButton}>5</button>
        <button className={styles.calcButton}>6</button>
        <button className={`${styles.calcButton} ${styles.operationButton}`}>
          -
        </button>

        <button className={styles.calcButton}>1</button>
        <button className={styles.calcButton}>2</button>
        <button className={styles.calcButton}>3</button>
        <button className={`${styles.calcButton} ${styles.operationButton}`}>
          +
        </button>

        <button className={`${styles.zeroButton} ${styles.calcButton}`}>
          0
        </button>
        <button className={`${styles.calcButton} ${styles.operationButton}`}>
          =
        </button>

        <div className={styles.logPanel}>
          <ul>
            {this.state.operationStream.map(op => (
              <li key={op.key}>{op.msg}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;

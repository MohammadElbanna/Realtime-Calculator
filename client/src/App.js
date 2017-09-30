import React, { Component } from "react";
import logo from "./logo.svg";
import styles from "./App.css";
import io from "socket.io-client";

class App extends Component {
  send() {
    console.log("I was clicked");
    var socket = io();
  }

  render() {
    return (
      <div className={styles.gridContainer}>
        <div className={styles.resultDisplay}>
          <span>0</span>
        </div>

        <div className={`${styles.acButton} ${styles.calcButton}`}>AC</div>
        <div className={`${styles.calcButton} ${styles.operationButton}`}>
          ÷
        </div>

        <div className={styles.calcButton}>7</div>
        <div className={styles.calcButton}>8</div>
        <div className={styles.calcButton}>9</div>
        <div className={`${styles.calcButton} ${styles.operationButton}`}>
          ×
        </div>

        <div className={styles.calcButton}>4</div>
        <div className={styles.calcButton}>5</div>
        <div className={styles.calcButton}>6</div>
        <div className={`${styles.calcButton} ${styles.operationButton}`}>
          -
        </div>

        <div className={styles.calcButton}>1</div>
        <div className={styles.calcButton}>2</div>
        <div className={styles.calcButton}>3</div>
        <div className={`${styles.calcButton} ${styles.operationButton}`}>
          +
        </div>

        <div className={`${styles.zeroButton} ${styles.calcButton}`}>0</div>
        <div className={styles.calcButton}>.</div>
        <div className={`${styles.calcButton} ${styles.operationButton}`}>
          =
        </div>

        <div className={styles.logPanel}>
          <h3>Realtime log</h3>
        </div>
      </div>
    );
  }
}

export default App;

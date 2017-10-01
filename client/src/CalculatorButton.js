import React, { Component } from "react";
import styles from "./CalculatorButton.css";

const CalculatorButton = props => {
  let classNames = `${styles.calcButton}`;
  if (props.acButton) {
    classNames = `${styles.calcButton} ${styles.acButton}`;
  } else if (props.zeroButton) {
    classNames = `${styles.zeroButton} ${styles.calcButton}`;
  } else if (props.operationButton) {
    classNames = `${styles.calcButton} ${styles.operationButton}`;
  }
  return <div className={classNames}>{props.text}</div>;
};

export default CalculatorButton;

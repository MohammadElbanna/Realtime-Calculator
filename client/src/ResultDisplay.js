import React, { Component } from "react";
import styles from "./ResultDisplay.css";

const ResultDisplay = props => {
  return (
    <div className={styles.resultDisplay}>
      <span>{props.resultDisplayNumber}</span>
    </div>
  );
};

export default ResultDisplay;

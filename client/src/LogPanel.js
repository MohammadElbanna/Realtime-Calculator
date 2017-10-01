import React, { Component } from "react";
import styles from "./LogPanel.css";

const LogPanel = props => {
  return (
    <div className={styles.logPanel}>
      <ol>{props.operations.map(op => <li key={op.key}>{op.msg}</li>)}</ol>
    </div>
  );
};

export default LogPanel;

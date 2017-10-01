import { operators } from "./constants.js";

var utils = {
  calculate(firstOperand, secondOperand, operator) {
    if (operator === operators.DIVIDE) {
      return parseInt(firstOperand, 10) / parseInt(secondOperand, 10);
    } else if (operator === operators.TIMES) {
      return parseInt(firstOperand, 10) * parseInt(secondOperand, 10);
    } else if (operator === operators.MINUS) {
      return parseInt(firstOperand, 10) - parseInt(secondOperand, 10);
    } else {
      return parseInt(firstOperand, 10) + parseInt(secondOperand, 10);
    }
  },

  stringifyOperation(firstOperand, secondOperand, operator, result) {
    return `${firstOperand} ${operator} ${secondOperand} = ${result}`;
  },

  isOperatorButton(buttonText) {
    return (
      buttonText === "×" ||
      buttonText === "÷" ||
      buttonText === "+" ||
      buttonText === "-"
    );
  },

  isEqualButton(buttonText) {
    return buttonText === "=";
  },

  isACButton(buttonText) {
    return buttonText === "AC";
  },

  isNumberButton(buttonText) {
    return (
      buttonText === "1" ||
      buttonText === "2" ||
      buttonText === "3" ||
      buttonText === "4" ||
      buttonText === "5" ||
      buttonText === "6" ||
      buttonText === "7" ||
      buttonText === "8" ||
      buttonText === "9" ||
      buttonText === "0"
    );
  }
};

export default utils;

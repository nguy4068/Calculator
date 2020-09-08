//Access all of the buttons and elements created by html
console.log("Hi");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButtons = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-allclear]");
const deleteButton = document.querySelector("[data-delete]");
const num1 = document.querySelector("[data-firstNum]");
const num2 = document.querySelector("[data-secondNum]");
class Calculator {
  constructor(num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
    this.clear();
  }
  clear() {
    this.textNum1 = "";
    this.textNum2 = "";
    this.num1.innerText = "";
    this.num2.innerText = "";
    this.operation = undefined;
  }
  delete() {
    this.textNum2 = this.textNum2.substr(0, this.textNum2.length - 1);
    this.updateDisplay();
  }
  appendNumber(number) {
    if (number === "." && this.textNum2.includes(".")) {
      return;
    }
    this.textNum2 = this.textNum2.toString() + number.toString();
  }
  chosenOperation(operation) {
    if (this.textNum2 === "") {
      return;
    }
    //If there's another previous operation, execute that operation first
    if (this.textNum1 !== "") {
      //compute the value produced by previous operation and put that value
      //inside num2 (bigger number appeared on the calculator)
      this.compute();
    }
    //reset the current operation after executing the previous operation
    this.operation = operation;
  }
  compute() {
    var result = 0;
    if (this.operation === "+") {
      result = parseFloat(this.textNum1) + parseFloat(this.textNum2);
    }
    if (this.operation === "-") {
      result = parseFloat(this.textNum1) - parseFloat(this.textNum2);
    }
    if (this.operation === "%") {
      result = parseFloat(this.textNum1) / parseFloat(this.textNum2);
    }
    if (this.operation === "*") {
      result = parseFloat(this.textNum1) * parseFloat(this.textNum2);
    }
    //Rest the bigger number on the calculator to the value
    //produced by the last operation
    this.textNum2 = "" + result;
    this.num2.innerText = this.textNum2;
    //Set the smaller number to 0 so that only the bigger number
    //also the result appears on the screen
    this.textNum1 = "";
    this.num1.innerText = this.textNum1;
  }
  /*
  Called when user typed in number, the bigger
  number will be updated
  */
  updateDisplay() {
    this.num2.innerText = this.textNum2;
  }
  /*
  Called when user typed in operation, the
  smaller number(num1) will now have the value of bigger
  number (mean that bigger number will be pushed to the top)
    , the bigger number's value will be set to zero
  */
  updateDisplay1() {
    this.num1.innerText = this.textNum2;
    this.textNum1 = this.textNum2;
    this.num2.innerText = "";
    this.textNum2 = "";
  }
}
//Initialize the calculator object
const calculator = new Calculator(num1, num2);
numberButtons.forEach((button) => {
  //loop through every number button to register for eventListener
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    //when an operation button is clicked
    //1. reset the current operation
    //2.add that operation sign next to the bigger number appeared
    //on the screen (bigger number here is num2)
    //3.update the appearance (here the bigger number and operation sign will
    //be pushed to the top and turn into smaller number, the new bigger number
    //value will be set to 0)
    calculator.chosenOperation(button.innerText);
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay1();
  });
});
equalsButtons.addEventListener("click", () => {
  calculator.compute();
});
clearButton.addEventListener("click", () => {
  calculator.clear();
});
deleteButton.addEventListener("click", () => {
  calculator.delete();
});

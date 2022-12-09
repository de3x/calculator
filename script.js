let displayValue = 0;
let number1, number2, selectedOperator;
let num1array = [];
let num2array = [];
let answer;

const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".operand");
const operatorButtons = document.querySelectorAll(".operator");
const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const multiplyButton = document.getElementById("multiply");
const divideButton = document.getElementById("divide");
const equalsButton = document.getElementById("equals");
const resetButton = document.getElementById("reset");

// Update display value
function updateDisplay() {
  display.innerText = displayValue;
}

function updateFirstNumber() {
  number1 = +num1array.join("");
  displayValue = number1;
  updateDisplay();
  // Empty num1 array for future calculations
}

function updateSecondNumber() {
  number2 = +num2array.join("");
  displayValue = number2;
  updateDisplay();
  // Empty num1 array for future calculations
}

// Give display initial placeholder value (0)
updateDisplay();

// TODO: add some keyboard functionality
window.addEventListener("keydown", function (e) {
  // Check if key is a number before storing in array
  if (!isNaN(parseInt(e.key))) {
    if (num1array.length < 9) {
      num1array.push(e.key);
      console.log(num1array);
    }
  }
  // Convert num1array to number1 whenever operator is pressed
  //   console.log(e.key);
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.stopPropagation();
    console.log(e);
  });
});

numberButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.stopPropagation();
    // Check if num1array empty to determine which number to update (1st or 2nd)
    if (selectedOperator === undefined) {
      if (num1array.length < 9) {
        num1array.push(parseInt(button.textContent));
        updateFirstNumber();
      }
    } else {
      if (num2array.length < 9) {
        num2array.push(parseInt(button.textContent));
        updateSecondNumber();
      }
    }
    console.log(parseInt(button.textContent));
  });
});

// Operator buttons functionality
addButton.addEventListener("click", function (e) {
  selectedOperator = "add";
  // Empty array for future calculations
  num1array = [];
});

subtractButton.addEventListener("click", function (e) {
  // Convert array into number and store it and then display it
  selectedOperator = "subtract";
  //   updateFirstNumber();
  // Empty array for future calculations
  num1array = [];
});

multiplyButton.addEventListener("click", function (e) {
  // Convert array into number and store it and then display it
  selectedOperator = "multiply";
  //   updateFirstNumber();
  // Empty array for future calculations
  num1array = [];
});

divideButton.addEventListener("click", function (e) {
  // Convert array into number and store it and then display it
  selectedOperator = "divide";
  //   updateFirstNumber();
  // Empty array for future calculations
  num1array = [];
});

equalsButton.addEventListener("click", function (e) {
  operate();
});

resetButton.addEventListener("click", function (e) {
  displayValue = 0;
  num1array = [];
  num2array = [];
  number1 = undefined;
  number2 = undefined;
  selectedOperator = undefined;
  answer = undefined;
  updateDisplay();
});

// Math operations
function add() {
  answer = number1 + number2;
  console.log(answer);
  num2array = [];
  display.innerText = answer;
}

function subtract() {
  answer = number1 - number2;
  num2array = [];
  display.innerText = answer;
}

function multiply() {
  answer = number1 * number2;
  num2array = [];
  display.innerText = answer;
}

function divide() {
  if (number2 === 0) return "#DIV/0!";
  else answer = num1 / num2;
  num2array = [];
  display.innerText = answer;
}

function operate() {
  if (selectedOperator === "add") {
    add();
  } else if (selectedOperator === "subtract") {
    subtract();
  } else if (selectedOperator === "multiply") {
    multiply();
  } else if (selectedOperator === "divide") {
    multiply();
  }
}

// function operate() {
//   console.log("new operate");
// }

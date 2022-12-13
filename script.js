const topDisplay = document.querySelector(".top-display");
const bottomDisplay = document.querySelector(".bottom-display");
const numberButtons = document.querySelectorAll(".operand");
const operatorButtons = document.querySelectorAll(".operator");
const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const multiplyButton = document.getElementById("multiply");
const divideButton = document.getElementById("divide");
const equalsButton = document.getElementById("equals");
const resetButton = document.getElementById("reset");
const signButton = document.getElementById("sign");
const percentButton = document.getElementById("percent");
const decimalButton = document.getElementById("decimal");
const allButtons = document.querySelectorAll("button");

let digitsArray = [];
let currentNumber = 0;
let currentTotal = undefined;
let selectedOperator = undefined;
let equalsPressed = false;
let answer = undefined;
let numberBtnPressed = false;
let decimalJustPressed = false;
// not sure if this is needed yet
// let previousNumber;

function setCurrentNumber() {
  currentNumber = +digitsArray.join("");
  updateBottomDisplay();
}

function setCurrentTotal() {}

function add(num1, num2) {
  let answer = +(num1 + num2);
  return answer;

  //   currentTotal += currentNumber;
  //   updateTopDisplay(`${currentTotal} +`);
  //   updateBottomDisplay(currentNumber);
  // todo
}

function subtract(num1, num2) {
  let answer = +(num1 - num2);
  return answer;
}

function multiply(num1, num2) {
  let answer = +(num1 * num2);
  return answer;
}

function divide(num1, num2) {
  if ((num1 != 0) & (num2 === 0)) {
    console.log(currentNumber);

    // disable all buttons
    allButtons.forEach((button) => {
      button.disabled = true;
    });

    decimalButton.disabled = true;

    // reenable "reset" button
    resetButton.disabled = false;
    resetButton.style.border = "2px solid yellow";
    resetButton.style.scale = "1.075";
    return "#DIV/0!";
  }
  let answer = +(num1 / num2);
  return answer;
}

function reset() {
  digitsArray = [];
  currentNumber = undefined;
  currentTotal = undefined;
  answer = undefined;
  selectedOperator = undefined;
  equalsPressed = false;
  numberBtnPressed = false;
  decimalButton.disabled = false;
  decimalJustPressed = false;

  // reenable all buttons from when dividing by 0
  allButtons.forEach((button) => {
    button.disabled = false;
  });

  resetButton.style.border = "inherit";
  resetButton.style.scale = "inherit";

  clearBothDisplays();
}

function getOperatorSymbol() {
  if (selectedOperator === "add") {
    return "+";
  } else if (selectedOperator === "subtract") {
    return "-";
  } else if (selectedOperator === "multiply") {
    return "*";
  } else if (selectedOperator === "divide") {
    return "/";
  } else if (selectedOperator === undefined) {
    return "";
  }
}

function updateTopDisplay(str) {
  topDisplay.textContent = str;
  //   let operatorSymbol = getOperatorSymbol();
  //   if (selectedOperator === undefined) {
  //     topDisplay.textContent = " ";
  //   }
  //   if ((currentNumber != undefined) & (selectedOperator != undefined)) {
  //     topDisplay.textContent = `${currentTotal} ${operatorSymbol}`;
  //   }
  //   if ((equalsPressed = true)) {
  //     topDisplay.textContent = `${currentTotal} ${operatorSymbol} ${currentNumber} =`;
  //   }
}

function updateBottomDisplay(num) {
  bottomDisplay.textContent = num;
}

function updateBothDisplays(topstring, bottomstring) {
  updateTopDisplay(topstring);
  updateBottomDisplay(bottomstring);
}

function clearTopDisplay() {
  topDisplay.textContent = "";
}

function clearBottomDisplay() {
  bottomDisplay.textContent = 0;
}

function clearBothDisplays() {
  clearTopDisplay();
  clearBottomDisplay();
}

function backspace() {
  // todo : need to create element and link to it
  // todo
}

function appendEqualsSign() {
  if (!equalsPressed) {
    topDisplay.textContent += " =";
  }
}

function operate() {
  appendEqualsSign();
  equalsPressed = true;
}

numberButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.stopPropagation();
    numberBtnPressed = true;
    // Reset calculator if equal button been pressed
    if (equalsPressed === true) {
      reset();
      updateBothDisplays();
    }

    if (digitsArray.length < 13) {
      // working way (not sure anymore about that)
      //   digitsArray.push(parseInt(button.textContent));
      //   currentNumber = +digitsArray.join("");
      // testing way
      if (button.disabled === false) {
        digitsArray.push(button.textContent.trim());
        let daj = digitsArray.join("").replace(/\s/g, "");
        currentNumber = +daj;
        console.log(currentNumber);
        // handle decimal input
        console.log(digitsArray);
        updateBottomDisplay(`${currentNumber}`);

        // handling decimals
        if (button.textContent === ".") {
          decimalButton.disabled = true;
          if (digitsArray.length === 1) {
            currentNumber = 0;
            updateBottomDisplay(`${currentNumber}.`);
          }
          if (digitsArray.length > 1) {
            // todo
            updateBottomDisplay(`${currentNumber}.`);
          }
        }
      }
    }
  });
});

addButton.addEventListener("click", function (e) {
  e.stopPropagation();
  selectedOperator = "add";

  // handle changing display of active selectedOperator
  if (topDisplay.textContent != "") {
    updateTopDisplay(`${currentTotal} +`);
  }

  if (equalsPressed === true) {
    // todo
    currentTotal = +bottomDisplay.textContent;
    updateTopDisplay(`${currentTotal} +`);
    updateBottomDisplay("");
    equalsPressed = false;
  }

  if (numberBtnPressed) {
    //   if (3 > 1) {

    selectedOperator = "add";
    if (currentTotal === undefined) currentTotal = 0;
    currentTotal = add(currentTotal, currentNumber);
    updateTopDisplay(`${currentTotal} +`);
    updateBottomDisplay("");

    // updateBottomDisplay("");
    // Empty array for next number
    digitsArray = [];
    numberBtnPressed = false;
    decimalButton.disabled = false;
  }
  decimalButton.disabled = false;
});

subtractButton.addEventListener("click", function (e) {
  e.stopPropagation();
  selectedOperator = "subtract";

  // handle changing display of active selectedOperator
  if (topDisplay.textContent != "") {
    updateTopDisplay(`${currentTotal} -`);
  }

  if (equalsPressed === true) {
    currentTotal = +bottomDisplay.textContent;
    updateBothDisplays(`${currentTotal} -`, "");
    equalsPressed = false;
  }

  if (numberBtnPressed) {
    // selectedOperator = "subtract";

    if (currentTotal != undefined) {
      currentTotal = subtract(currentTotal, currentNumber);
      updateTopDisplay(`${currentTotal} -`);
      updateBottomDisplay("");
    }

    if (currentTotal === undefined) {
      currentTotal = currentNumber;
      updateTopDisplay(`${currentTotal} -`);
      updateBottomDisplay("");
    }
    // Empty array for next number
    digitsArray = [];
    numberBtnPressed = false;
    decimalButton.disabled = false;
  }
  decimalButton.disabled = false;
});

multiplyButton.addEventListener("click", function (e) {
  e.stopPropagation();
  selectedOperator = "multiply";

  // handle changing display of active selectedOperator
  if (topDisplay.textContent != "") {
    updateTopDisplay(`${currentTotal} *`);
  }

  if (equalsPressed) {
    currentTotal = +bottomDisplay.textContent;
    updateBothDisplays(`${currentTotal} *`, "");
    equalsPressed = false;
  }

  if (numberBtnPressed) {
    // selectedOperator = "subtract";

    if (currentTotal != undefined) {
      currentTotal = multiply(currentTotal, currentNumber);
      updateTopDisplay(`${currentTotal} *`);
      updateBottomDisplay("");
    }

    if (currentTotal === undefined) {
      currentTotal = currentNumber;
      updateTopDisplay(`${currentTotal} *`);
      updateBottomDisplay("");
    }
    // Empty array for next number
    digitsArray = [];
    numberBtnPressed = false;
    decimalButton.disabled = false;
  }
  decimalButton.disabled = false;
});

divideButton.addEventListener("click", function (e) {
  e.stopPropagation();
  selectedOperator = "divide";

  // handle changing display of active selectedOperator
  if (topDisplay.textContent != "") {
    updateTopDisplay(`${currentTotal} /`);
  }

  if (equalsPressed) {
    currentTotal = +bottomDisplay.textContent;
    updateBothDisplays(`${currentTotal} /`, "");
    equalsPressed = false;
  }

  if (numberBtnPressed) {
    if (currentTotal != undefined) {
      currentTotal = divide(currentTotal, currentNumber);
      updateTopDisplay(`${currentTotal} /`);
      updateBottomDisplay("");
    }

    if (currentTotal === undefined) {
      currentTotal = currentNumber;
      updateTopDisplay(`${currentTotal} /`);
      updateBottomDisplay("");
    }
    // Empty array for next number
    digitsArray = [];
    numberBtnPressed = false;
    decimalButton.disabled = false;
  }
  decimalButton.disabled = false;
});

equalsButton.addEventListener("click", function (e) {
  e.stopPropagation();

  if (
    (currentTotal != undefined) &
    (selectedOperator != undefined) &
    (digitsArray.length != 0)
  ) {
    equalsPressed = true;
    let operatorSymbol = getOperatorSymbol();

    // Top display
    updateTopDisplay(`${currentTotal} ${operatorSymbol} ${currentNumber} =`);

    // Botttom display
    if (selectedOperator === "add") {
      let answer = add(currentTotal, currentNumber);
      updateBottomDisplay(`${answer}`);
    }
    if (selectedOperator === "subtract") {
      let answer = subtract(currentTotal, currentNumber);
      updateBottomDisplay(`${answer}`);
    }
    if (selectedOperator === "multiply") {
      let answer = multiply(currentTotal, currentNumber);
      updateBottomDisplay(`${answer}`);
    }
    if (selectedOperator === "divide") {
      let answer = divide(currentTotal, currentNumber);
      if (answer === "#DIV/0!") {
        decimalButton.disabled = true;
      }
      updateBottomDisplay(`${answer}`);
    }
    // Empty array for next number
    digitsArray = [];
    numberBtnPressed = false;
  }
});

decimalButton.addEventListener("click", function (e) {
  e.stopPropagation();
});

resetButton.addEventListener("click", function () {
  reset();
});

signButton.addEventListener("click", function (e) {
  // todo
  currentNumber = bottomDisplay.textContent * -1;
  updateBottomDisplay(currentNumber);
});

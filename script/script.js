"use strict";
// console.log("hello world");

const mainDisplay = document.getElementById("main-display");
const upperDisplay = document.getElementById("upper-display");
const btnNumberAll = document.querySelectorAll("btn-num");
const btnAll = document.querySelectorAll(".btn");
const debugContainer = document.getElementById("debug-output");
const debugClearBtn = document.getElementById("debug-clear");
const debugTestBtn = document.getElementById("debug-test");

let firstNumber,
  secondNumber,
  evalNumber,
  currentOperator,
  nextOperator,
  upperString,
  evaluatedToggle,
  lowerString,
  operatorToggle;
let previousCalculations = [];

const init = function () {
  secondNumber = "0";
  firstNumber = evalNumber = currentOperator = upperString = "";
  lowerString = firstNumber;
  operatorToggle = evaluatedToggle = false;
  secondNumber =
    "1111111111111111111111111111111111111111111111111111111111111111111111111";
  updateNumber();

  // setScreen();
  // testFunction("init");
};

const updateDisplay = function () {
  if (lowerString.length > 80) return naughtyCatcher("stupidBigNumber");
  mainDisplay.style.fontSize = `${setLowerDisplayFontSize()}px`;

  mainDisplay.textContent = lowerString;
  upperDisplay.textContent = upperString;
};

const setLowerDisplayFontSize = function () {
  console.log(lowerString.length);
  if (lowerString.length < 16) return 50;
  if (lowerString.length < 27) return 30;
  return 20;
};

const updateNumber = function () {
  lowerString = secondNumber;
  updateDisplay();
};

const btnClick = function (input, type) {
  if (type === "number") numberClick(input);
  if (type === "action") actionClick(input);
  if (type === "operator") operatorClick(input);
  updateDisplay();
};

const numberClick = function (input) {
  operatorToggle = false;
  if (evaluatedToggle && !currentOperator) {
    console.log("this");
    evaluatedToggle = false;
    firstNumber = upperString = lowerString = "";
    updateDisplay();
  }

  if (secondNumber === "0") secondNumber = "";
  secondNumber = secondNumber + input;
  lowerString = secondNumber;
  updateDisplay();
  testFunction("numberClick", "green");
};

const actionClick = function (input) {
  if (input === "backspace") backspace();
  if (input === "point") point();
  if (input === "clear") init();
  if (input === "+/-") signChange();
  if (input === "evaluate") evaluate("calledByBtn");
  updateDisplay();
};

const operatorClick = function (input) {
  // if (secondNumber === "0" || !secondNumber) return console.log("guarded");
  if (operatorToggle) {
    console.log("operator toggle");
    currentOperator = input;
    console.log(`currentOperator:${currentOperator}`);
    upperString = `${firstNumber} ${currentOperator}`;
    return;
  }
  operatorToggle = true;
  testFunction("operatorClick", "orangered", "Start");
  if (!firstNumber && !evaluatedToggle) {
    firstNumber = secondNumber;
    lowerString = secondNumber = "";
    currentOperator = input;
    upperString = `${firstNumber} ${currentOperator}`;
    testFunction("operatorClick", "orangered", "-End-fnc1");
    return;
  }
  if (firstNumber && evaluatedToggle) {
    evaluatedToggle = false;
    currentOperator = input;
    upperString = `${firstNumber} ${currentOperator}`;
    lowerString = "";

    testFunction("operatorClick", "orangered", "-End-fnc2");
    return;
  }
  if (firstNumber && !evaluatedToggle) {
    if (currentOperator === "/" && secondNumber === "0")
      return naughtyCatcher("divideByZero");
    firstNumber = evalNumber = evaluateOperation(input);
    currentOperator = input;
    upperString = `${firstNumber} ${currentOperator}`;
    secondNumber = lowerString = "";
    testFunction("operatorClick", "orangered", "-End-fnc3");
    return;
  }
};
operatorToggle = false;
const evaluate = function (callSource) {
  testFunction("evaluate", "blue", "Start");
  if (currentOperator === "/" && secondNumber === "0")
    return naughtyCatcher("divideByZero");

  lowerString = evalNumber = evaluateOperation(currentOperator);
  upperString = `${firstNumber} ${currentOperator} ${secondNumber} =`;
  firstNumber = evalNumber;
  currentOperator = "";
  secondNumber = "";

  updateDisplay();
  evaluatedToggle = true;

  testFunction("evaluate", "blue", "-End-");
};
const evaluateOperation = function (operator) {
  console.log(`evaluating ${firstNumber} ${currentOperator} ${secondNumber}`);
  const evaluation = evaluateHelp(operator);
  previousCalculations.push({
    firstNumber: Number(firstNumber),
    currentOperator,
    secondNumber: Number(secondNumber),
    evaluation,
  });
  console.log(previousCalculations);
  return evaluateHelp(operator);
};
const evaluateHelp = function (operator) {
  if (operator === "+") return Number(firstNumber) + Number(secondNumber);
  if (operator === "-") return Number(firstNumber) - Number(secondNumber);
  if (operator === "x") return Number(firstNumber) * Number(secondNumber);
  if (operator === "/") return Number(firstNumber) / Number(secondNumber);
};
const naughtyCatcher = function (input) {
  if (input === "divideByZero") {
    upperString =
      "Division by zero detected. Please don't try that again, the world may well end!";
    lowerString = "resetting...";
  }
  if (input === "stupidBigNumber") {
    upperString =
      "That number is ridiculously long!  Please try to behave yourself and use me properly next time.";
    lowerString = "resetting...";
  }
  updateDisplay();
  btnAll.forEach((el) =>
    el.removeEventListener("mousedown", addMouseClickListener)
  );
  setTimeout(function () {
    btnAll.forEach((el) => el.addEventListener("click", addMouseClickListener));
    init();
  }, 3000);
};

const backspace = function () {
  secondNumber = secondNumber.slice(0, -1);
  if (secondNumber === "") secondNumber = "0";
  lowerString = secondNumber;

  testFunction("backspace", "blue");
};

const point = function () {
  if (secondNumber.includes(".")) return;
  secondNumber += ".";
  lowerString = secondNumber;
  testFunction("point", "blue");
};

const signChange = function () {
  secondNumber = (secondNumber * -1).toString();
  lowerString = secondNumber;
  testFunction("signChange", "blue");
};

const testFunction = function (
  inputFunction,
  color = "black",
  position = "-----"
) {
  const text = `${inputFunction} ${position} CurOp: ${currentOperator} nxtOp: ${nextOperator}
  fN: ${firstNumber},   sN: ${secondNumber},  eN: ${evalNumber},  lS: ${lowerString},  uS: ${upperString}`;
  const element = document.createElement("div");
  element.classList.add("debug-content");
  element.textContent = text;
  element.style.color = color;
  debugContainer.append(element);
  console.log(
    `evaluatedToggle:${evaluatedToggle} operatorToggle:${operatorToggle}`
  );
};

const addMouseClickListener = function (e) {
  e.target.closest(".btn").style.color = "white";
  setTimeout(() => (e.target.closest(".btn").style.color = "black"), 300);
  const clicked = e.target.closest(".btn");
  btnClick(clicked.dataset.btn, clicked.dataset.type);
};
btnAll.forEach((el) => {
  el.addEventListener("mousedown", addMouseClickListener);
  el.addEventListener("mouseover", function (e) {
    btnAll.forEach((el) => el.classList.remove("btn-mouseover"));
    e.target.closest(".btn").classList.add("btn-mouseover");
  });
  el.addEventListener("mouseout", function (e) {
    btnAll.forEach((el) => el.classList.remove("btn-mouseover"));
  });
});

debugClearBtn.addEventListener("click", function (e) {
  debugContainer.textContent = "";
});
debugTestBtn.addEventListener("click", function () {
  testFunction("testButton", "teal");
});

init();

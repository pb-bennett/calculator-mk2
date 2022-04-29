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
  rollToggle;

const init = function () {
  secondNumber = "0";
  firstNumber = evalNumber = currentOperator = upperString = "";
  lowerString = firstNumber;
  rollToggle = evaluatedToggle = false;
  updateNumber();

  // setScreen();
  // testFunction("init");
};

const updateDisplay = function () {
  mainDisplay.textContent = lowerString;
  upperDisplay.textContent = upperString;
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
  if (rollToggle) {
    console.log("rolling");
    evaluatedToggle === false;
    rollToggle === false;
    firstNumber = evalNumber;
    upperString = `${firstNumber} ${currentOperator}`;
    secondNumber = "";
    // currentOperator = "";
    lowerString = "0";
  }
  if (evaluatedToggle) {
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
  if (secondNumber === "0" || !secondNumber) return console.log("guarded");
  testFunction("operatorClick", "orangered", "Start");
  if (!firstNumber) {
    firstNumber = secondNumber;
    lowerString = secondNumber = "";
    currentOperator = input;
    upperString = `${firstNumber} ${currentOperator}`;
    testFunction("operatorClick", "orangered", "-End-fnc1");
    return;
  }
  if (firstNumber) {
    evaluate("calledByOperator");
    nextOperator = input;
    testFunction("operatorClick", "orangered", "-End-fnc2");
  }
};
const evaluate = function (callSource) {
  testFunction("evaluate", "blue", "Start");
  if (callSource === "calledByBtn") {
    lowerString = evalNumber = evaluateOperation(currentOperator);
    upperString = `${firstNumber} ${currentOperator} ${secondNumber} =`;
    currentOperator = "";
    updateDisplay();
  }
  if (callSource === "calledByOperator") {
    testFunction("evaluate", "green", "-CBO-");
    lowerString = evalNumber = evaluateOperation(currentOperator);
    upperString = `${firstNumber} ${currentOperator} ${secondNumber} =`;
    currentOperator = nextOperator;
    nextOperator = "";
    rollToggle = true;
  }
  evaluatedToggle = true;

  testFunction("evaluate", "blue", "-End-");
};
const evaluateOperation = function (operator) {
  if (operator === "+") return Number(firstNumber) + Number(secondNumber);
  if (operator === "-") return Number(firstNumber) - Number(secondNumber);
  if (operator === "x") return Number(firstNumber) * Number(secondNumber);
  if (operator === "/") return Number(firstNumber) / Number(secondNumber);
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
  // const text = `${counter}:<<${position}>><<${inputFunction}>>, CurOp: ${currentOperator}
  // fNA: ${firstNumber},  oA: ${operatorsArr[counter]},  sNA: ${secondNumber},  eA: ${evaluationsArr[counter]},  cS: ${currentString},  uS: ${upperString}`;
  // const element = document.createElement("div");
  // element.classList.add("debug-content");
  // element.textContent = text;
  // element.style.color = color;
  // debugContainer.append(element);
  // console.log(inputFunction, counter);
  // console.log(firstNumbersArr, secondNubersArr, operatorsArr, evaluationsArr);
};

btnAll.forEach((el) => {
  el.addEventListener("mousedown", function (e) {
    // console.log(e.target.dataset.btn);
    e.target.closest(".btn").style.color = "white";
    setTimeout(() => (e.target.closest(".btn").style.color = "black"), 300);
    const clicked = e.target.closest(".btn");
    btnClick(clicked.dataset.btn, clicked.dataset.type);
  });
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

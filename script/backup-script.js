"use strict";
console.log("hello world");

const mainDisplay = document.getElementById("main-display");
const upperDisplay = document.getElementById("upper-display");
const btnNumberAll = document.querySelectorAll("btn-num");
const btnAll = document.querySelectorAll(".btn");
const debugContainer = document.getElementById("debug-output");
const debugClearBtn = document.getElementById("debug-clear");
const debugTestBtn = document.getElementById("debug-test");

let firstNumbersArr,
  secondNubersArr,
  operatorsArr,
  evaluationsArr,
  currentString,
  upperString,
  counter,
  evaluatedToggle;

const init = function () {
  firstNumbersArr = [];
  secondNubersArr = [];
  operatorsArr = [];
  evaluationsArr = [];
  currentString = "0";
  upperString = "";
  counter = 0;
  evaluatedToggle = false;
  updateScreen();
  testFunction("init");
};

const updateScreen = function () {
  mainDisplay.textContent = currentString;
  upperDisplay.textContent = upperString;
};

const btnClick = function (input, type) {
  console.log(input, type);
  if (type === "number") numberClick(input);
  if (type === "action") actionClick(input);
  if (type === "operator") operatorClick(input);
  updateScreen();
  // testFunction("buttonClick", "purple");
};

const numberClick = function (input) {
  if (evaluatedToggle === true && !operatorsArr[counter]) {
    currentString = "";
    firstNumbersArr[counter] = "";
    evaluatedToggle = false;
  }
  if (currentString === "0") currentString = "";
  // if(operatorsArr[counter])
  currentString = currentString + input;
  console.log(currentString);
  testFunction("numberClick", "green");
  // updateScreen();
};
const actionClick = function (input) {
  if (input === "backspace") backspace();
  if (input === "point") point();
  if (input === "clear") init();
  if (input === "+/-") signChange();
  if (input === "evaluate") evaluate();
  console.log(currentString);
  // testFunction("actionClick", "orangered");
  // updateScreen();
};

const operatorClick = function (input) {
  testFunction("operatorClick", "orangered", "Start");
  // if (firstNumbersArr[counter] && currentString && operatorsArr[counter])
  //   evaluate(input);
  if (!currentString || currentString === "0") return;
  if (
    firstNumbersArr[counter] &&
    Number(currentString) > 0 &&
    operatorsArr[counter]
  ) {
    evaluate(operatorsArr[counter]);
  }
  if (firstNumbersArr[counter]) {
    secondNubersArr[counter] = Number(currentString);
    console.log(
      "First option in if",
      firstNumbersArr[counter],
      secondNubersArr[counter]
    );
  }
  if (!firstNumbersArr[counter]) {
    firstNumbersArr[counter] = Number(currentString);
    console.log(
      "Second option in if",
      firstNumbersArr[counter],
      secondNubersArr[counter]
    );
  }
  operatorsArr[counter] = input;
  upperString = `${firstNumbersArr[counter]} ${operatorsArr[counter]}`;
  currentString = evaluationsArr[counter];
  updateScreen();
  currentString = "";

  testFunction("operatorClick", "orangered", "-End-");
};
const evaluate = function (input, callSource) {
  testFunction("evaluate", "blue", "Start");
  if (!operatorsArr[counter]) return;
  const operator = input || operatorsArr[counter];
  if (
    firstNumbersArr[counter] &&
    // operatorsArr[counter] &&
    !secondNubersArr[counter]
  )
    secondNubersArr[counter] = Number(currentString);

  // console.log("operator:", operator);
  console.log(
    `evaluating: ${firstNumbersArr[counter]} ${operatorsArr[counter]} ${secondNubersArr[counter]}`
  );
  evaluationsArr[counter] = evaluateOperation(operator);
  console.log("you should see this");
  upperString = `${firstNumbersArr[counter]} ${operatorsArr[counter]} ${secondNubersArr[counter]} =`;
  currentString = evaluationsArr[counter];
  updateScreen();
  // testFunction("evaluate", "red");
  counter++;
  firstNumbersArr[counter] = evaluationsArr[counter - 1];
  evaluatedToggle = true;
  testFunction("evaluate", "blue", "-End-");
};
const evaluateOperation = function (operator) {
  // console.log("evaluate Operation");
  // console.log(operator);
  if (operator === "+")
    return firstNumbersArr[counter] + secondNubersArr[counter];
  if (operator === "-")
    return firstNumbersArr[counter] - secondNubersArr[counter];
  if (operator === "x")
    return firstNumbersArr[counter] * secondNubersArr[counter];
  if (operator === "/")
    return firstNumbersArr[counter] / secondNubersArr[counter];
};

const backspace = function () {
  currentString = currentString.slice(0, -1);
  if (currentString === "") currentString = "0";
  testFunction("backspace", "blue");
};

const point = function () {
  if (currentString.includes(".")) return;
  currentString += ".";
  testFunction("point", "blue");
};

const signChange = function () {
  currentString = (currentString * -1).toString();
  testFunction("signChange", "blue");
};

const testFunction = function (
  inputFunction,
  color = "black",
  position = "-----"
) {
  const text = `${counter}:<<${position}>><<${inputFunction}>>,
  fNA: ${firstNumbersArr[counter]},  oA: ${operatorsArr[counter]},  sNA: ${secondNubersArr[counter]},  eA: ${evaluationsArr[counter]},  cS: ${currentString},  uS: ${upperString}`;

  // const text = `${counter}:  Input function: ${inputFunction},
  // firstNumbersArr[${counter}]: ${firstNumbersArr[counter]},  operatorsArr[${counter}]: ${operatorsArr[counter]},  secondNumbersArr[${counter}]: ${secondNubersArr[counter]},  evaluationsArr[${counter}]: ${evaluationsArr[counter]},  currentString: ${currentString},  upperString: ${upperString}`;

  const element = document.createElement("div");
  element.classList.add("debug-content");
  element.textContent = text;
  element.style.color = color;
  debugContainer.append(element);
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

// firstNumbersArr[counter] = 5;
// secondNubersArr[counter] = 2;
// operatorsArr[counter] = "x";
// if (e.target.closest(".btn").classList.contains("btn-num")) {
//   const clicked = e.target.closest(".btn-num");
//   btnNumClick(clicked.dataset.btn);
// }
// //
// if (e.target.closest(".btn").classList.contains("btn-op")) {
//   const clicked = e.target.closest(".btn-op");
//   btnOpClick(clicked.dataset.btn);
// }
// if (e.target.closest(".btn").classList.contains("btn-clear")) {
//   console.log("resetting");
//   init();
//   updateScreen();
// }
// if (e.target.closest(".btn").classList.contains("btn-evaluate")) {
//   console.log("evaluating");
//   evaluate(currentOperator);
//   updateScreen();
// }
// if (e.target.closest(".btn").classList.contains("btn-sign-change")) {
//   console.log("Sign-change");
//   currentNumString = (currentNumString * -1).toString();
//   updateScreen();
// }
// if (e.target.closest(".btn").classList.contains("btn-backspace")) {
//   console.log("backspace");
//   backspace();
//   updateScreen();
// }
// if (e.target.closest(".btn").classList.contains("btn-point")) {
//   console.log("point");
//   point();
//   updateScreen();
// }

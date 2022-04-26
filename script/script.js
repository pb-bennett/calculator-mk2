"use strict";
console.log("hello world");

const mainDisplay = document.getElementById("main-display");
const upperDisplay = document.getElementById("upper-display");
const btnNumberAll = document.querySelectorAll("btn-num");
const btnAll = document.querySelectorAll(".btn");

let firstNumbers, secondNubers, operators, currentString, upperString, counter;

const init = function () {
  firstNumbers = [];
  secondNubers = [];
  operators = [];
  currentString = "0";
  upperString = "";
  counter = 0;
  updateScreen();
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
};

const numberClick = function (input) {
  if (currentString === "0") currentString = "";
  currentString = currentString + input;
  console.log(currentString);
  // updateScreen();
};
const actionClick = function (input) {
  if (input === "backspace") backspace();
  if (input === "point") point();
  if (input === "clear") init();
  if (input === "+/-") signChange();
  console.log(currentString);
  // updateScreen();
};
const operatorClick = function (input) {};

const backspace = function () {
  currentString = currentString.slice(0, -1);
  if (currentString === "") currentString = "0";
};

const point = function () {
  if (currentString.includes(".")) return;
  currentString += ".";
  // updateScreen();
};

const signChange = function () {
  currentString = (currentString * -1).toString();
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
init();
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

//select

let range = document.getElementById("myRange");
let valueField = document.getElementById("myValue");

console.log("range", range);

function changeHappened() {
  console.log("what's change?",range.value);
  valueField.innerHTML = range.value;
}

range.addEventListener("change",changeHappened);

function inputHappened() {
  console.log("what's input?",range.value);
  valueField.innerHTML = range.value;
  valueField.style.left = range.value + "px";
  // try myRange
}

range.addEventListener("input",inputHappened);

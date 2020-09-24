//select

let range = document.getElementById("range1");
let range2 = document.getElementById("range2");
let range3 = document.getElementById("range3");
let range4 = document.getElementById("range4");
let stuff1 = document.getElementById("stuff1");
let prev = 0;
let now = 0;
let array_tri = ["up", "down", "right", "left"];
console.log("range", range);

function changeHappened() {
  console.log("what's change?",range.value);
  // valueField.innerHTML = range.value;
}

range.addEventListener("change",changeHappened);

function inputHappened() {
  console.log("what's input?",range.value);
  prev = now;
  now = range.value;
  console.log(prev, now, now-prev)
  if (range.value >=100) {
    range.style.width = 3 * range.value + "px";
    range.max = 3 * range.value;
  }
  window.scrollBy((now - prev)*0.9,0);
}

function inputHappened2() {
  console.log("what's input?",range2.value);
  stuff1.style.left = -99 + 3 * range2.value + "px";
  range3.style.left = -99 + 2 * range2.value + "px";
  range4.style.left = -99 + 2 * range2.value + "px";

}

range2.addEventListener("input",inputHappened2);


function inputHappened3() {
  console.log("what's input?",range3.value);
  stuff1.style.top = 30 + 1 * range3.value + "px";
  range4.style.top = 5 + 1 * range3.value + "px";
}

range3.addEventListener("input",inputHappened3);

function inputHappened4() {
  console.log("what's input?",range4.value);
  document.getElementById("arrow-up").style.transform = "rotate(" + range4.value + "deg)";
  document.getElementById("arrow-down").style.transform = "rotate(" + range4.value + "deg)";
  document.getElementById("arrow-right").style.transform = "rotate(" + range4.value + "deg)";
  document.getElementById("arrow-left").style.transform = "rotate(" + range4.value + "deg)";

}

range4.addEventListener("input",inputHappened4);

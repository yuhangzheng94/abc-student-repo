let button = document.getElementById("button");
let currentValue = 0;
let counter = document.getElementById("counter");

chrome.runtime.sendMessage( { type: "getCurrentValue"}, function(response) {
  console.log("response is", response);
  currentValue = response.value;
  counter.innerHTML = currentValue;
});

button.addEventListener("click", ()=>{
  currentValue += 1;
  counter.innerHTML = currentValue;

  chrome.runtime.sendMessage( { type: "increasedValue" } );
});

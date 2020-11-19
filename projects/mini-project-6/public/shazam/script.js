console.log("opened /say-it-again/script.js");

let button = document.getElementById("button");
// let guessInput = document.getElementById("guess");
//
button.addEventListener("click", ()=>{
  console.log("clicked the button");
  // let guess = guessInput.value;
  // console.log("guess:", guess);
  // window.location.href = "/say-it?guess=" + guess
  window.location.href = "/"
})

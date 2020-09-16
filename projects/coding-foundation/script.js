console.log(document);

let createSquaresBtn = document.getElementById("createSquaresBtn");

//add event listener to the button
  createSquaresBtn.addEventListener("click",createSquares);

function createSquares() {
  try {
    document.getElementById("squareBox").remove();
  } catch (e) {

  } finally {
    // Get the value from input box
    let squareNumber;
    squareNumber = document.getElementById("squaresNumberInput").value;
    console.log(squareNumber);

    console.log("function createSquares"+squareNumber);
    let squareBox = document.createElement("div");
    squareBox.id = "squareBox";
    // squareBox.id = "squareBox";
    squareBox.style.display = "flex";
    squareBox.style.flexWrap = "wrap";
    squareBox.style.margin = "5%";
    document.body.appendChild(squareBox);
    //style the square box

    for (i = 1; i <= squareNumber ; i++) {
      let square = document.createElement("div");
      //style the squares
      square.style.backgroundColor = "white";
      square.style.margin = "5px";
      square.style.width = "50px";
      square.style.height = "50px";
      squareBox.appendChild(square);
    }
  }

}

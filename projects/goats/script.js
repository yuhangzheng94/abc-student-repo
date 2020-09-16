console.log(document);

//set a div as flex box
  let imageBox = document.createElement("div");
  imageBox.style.display = "flex";
  document.body.appendChild(imageBox);

  let j = 1;

//put images into seperate div
for (i = 1; i <= 7; i++) {
  let goatImage = document.createElement("img");
  goatImage.id = "img" + i.toString();
  console.log(goatImage.id);
  goatImage.style.height = "100px";
  goatImage.style.margin = "10px";
  goatImage.style.width = "auto";
  goatImage.style.display = "flex";
  goatImage.src = "/projects/goats/images/goat" + i +".png";
      imageBox.appendChild(goatImage);
  if (i > 1) {
      goatImage.style.display = "none";
  }
  // imageBox.appendChild(goatImage);
}
//add event listener onchange()
  document.getElementsByClassName("slidecontainer").addEventListener("change",trick());
//read the value
  function trick() {
    let j = document.getElementById("slidecontainer").value;
    console.log(j);
    document.getElementById("img"+j.toString()).style.display = "flex";
    document.getElementById("img"+calc( j + 1 )).style.display = "none";
  }
//set display or none

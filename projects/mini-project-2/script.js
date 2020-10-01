console.log(document);

let button = document.getElementById("button");
console.log(button);
let sw = screen.width;
let sh = screen.height;

function createHourglass() {
  console.log("create hourglass");
  console.log("create upper hourglass");
  for (let i=0; i<5; i++) {
    for (let j = 0; j < 15; j++) {
      let randomX = (sw - 160)* ( 1/6 + (1/2 - 1/6)/5 * i) +  Math.random() * (sw - 160) * (2/3 - (1/2 - 1/6)/5 * i * 2);
      let randomY = Math.random() * (sh - 200) * 1/10 + (sh - 200) * 1/10 * i;
      console.log("now a window should open");
      let newWindow = window.open("sand/index.html","","width=20, height = 100, left = "+randomX+", top = "+randomY);
      setTimeout( function(){
        let randomX = (sw - 160)* ( 1/6 + (1/2 - 1/6)/5 * (5-i)) +  Math.random() * (sw - 160) * (2/3 - (1/2 - 1/6)/5 * (5-i) * 2);
        let randomY = Math.random() * (sh - 200) * 1/10 + (sh - 200) * 1/10 * (i+4);
        newWindow.moveTo(randomX, randomY);
      },(i+1)*10000);
      setTimeout( function(){
        newWindow.close();
      },55000);
    }
  }
}

function changeColor(color) {
  button.style.backgroundColor = color;
}

button.addEventListener("mouseenter", ()=>{ changeColor("blue"); });

button.addEventListener("mouseleave", ()=>{ changeColor("black"); });

button.addEventListener("mousedown", ()=>{ changeColor("red"); });

button.addEventListener("mouseup", ()=>{ changeColor("blue"); });

button.addEventListener("click",createHourglass);

let button = window.document.getElementById("button");
console.log(button);

let sw = screen.width;
let sh = screen.height;

function openWindow() {
  console.log("now a window should open");
  let randomX = Math.random() * (sw - 200);
  let randomY = Math.random() * (sh - 100);
  let newWindow = window.open("hello/index.html","","width=200, height = 100, left = "+randomX+", top = "+randomY);
  let randomTime = 
  setTimeout( function(){
    newWindow.close();
  }, 5000);

};

function openManyWindows() {
  for (let i = 0; i < 30; i++) {
    openWindow();
  }
}

button.addEventListener("click", openManyWindows);

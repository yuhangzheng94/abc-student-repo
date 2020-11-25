console.log('Hi script.js');

let socket = io();
let boxNo = 0;
let wh = window.innerHeight;
let ww = window.innerWidth;
let boxWidth = 50;
let boxHeight = 50;

socket.on('initData', (initData)=>{
  userCount = initData["userCount"];
  console.log("initial user count:", userCount);
  for (i=1;i<=userCount;i++) {
    addBox();
  }
  boxNo = userCount;
});

socket.on("countChange", (change) => {
  if ( change == "connect" ) {
    userCount += 1;
    console.log("user++; user count:", userCount);
    addBox();
  } else if ( change == "disconnect" ) {
    userCount -= 1;
    console.log("user--; user count:", userCount);
    removeBox();
  }
});

function addBox() {
  boxNo += 1;
  let box = document.createElement("div");
  box.id = "box" + boxNo;
  boxTop = Math.random() * ( wh - boxHeight );
  boxLeft = Math.random() * ( ww - boxWidth );
  box.style.cssText = "position: absolute; background-color: black; width:" + boxWidth + "px; height:" + boxHeight + "px; top:" + boxTop+ "px; left:" + boxLeft + "px; margin: 0px" ;
  document.body.appendChild(box);
}

function removeBox() {
  boxNo -= 1;
  let boxId = "box" + boxNo;
  let box = document.getElementById(boxId)
  document.body.removeChild(box);
}

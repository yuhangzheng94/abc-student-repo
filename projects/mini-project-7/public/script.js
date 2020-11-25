console.log('Hi script.js');

let socket = io();

let wh = window.innerHeight;
let ww = window.innerWidth;

socket.on('initData', (boxDict)=>{
  userCount = boxDict.length;
  console.log("initial user count:", userCount);
  for ( let key in boxDict ) {
    let boxAttributes = boxDict[key];
    addBox(boxAttributes);
  }
});

socket.on("newBox", (newBox) => {
  addBox(newBox);
});

socket.on("deleteBox", (boxId) => {
  removeBox(boxId);
});

function addBox(boxAttributes) {
  let box = document.createElement("div");
  box.id = boxAttributes["boxId"];
  let bt = boxAttributes["boxTop"];
  let bl = boxAttributes["boxLeft"];
  let bel = boxAttributes["boxEdgeLength"];
  bt *= ( 1 - bel / wh) * 100;
  bl *= ( 1 - bel / ww) * 100;
  box.style.cssText = "position: absolute; background-color: black; width:" + bel + "px; height:" + bel + "px; top:" + bt + "vh; left:" + bl + "vw; margin: 0px" ;
  document.body.appendChild(box);
}

function removeBox(boxId) {
  let box = document.getElementById(boxId)
  document.body.removeChild(box);
}

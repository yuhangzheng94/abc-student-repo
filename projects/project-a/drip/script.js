let sh = screen.height;
let sw = screen.width;

window.open("tank/index.html","","width="+sw+",height=200, left="+(sw/2-100)+",top="+(sh-200));

let dropHeight = sh - 400;


let myInterval = setInterval(()=>{
  drop = window.open("drop/index.html","","height=200,width=200,top=200,left="+(sw/2-100));
  myInterval2 = setInterval(()=>{
    drop.moveBy(0,(sh-400)/4);
  },500);
  setTimeout(()=>{
    clearInterval(myInterval2);
    drop.close();
  },2000);
},2000);

setTimeout(()=>{
  clearInterval(myInterval);
},8000);

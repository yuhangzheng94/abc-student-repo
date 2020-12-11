let initWidth = 130;
let initHeight = 180;

let by = 30;
let interval = 400;
let round = 5;

let sw = screen.width;
let sh = screen.height;

window.addEventListener("click", ()=>{

  //get position of the click
  let x = event.screenX;
  let y = event.screenY;

  let newWindow = window.open("circle/index.html","ripple","innerheight="+initHeight+"px, innerWidth="+ initHeight +"px, left="+( x- initWidth / 2 )+"px, top=" +( y - initHeight / 2 )+ "px");

  let myInterval = setInterval(()=>{
    by = Math.random() * 50 + 30;
    widthBy = by;
    heightBy = by;
    newWindow.resizeBy(widthBy, heightBy);
    newWindow.moveBy(- widthBy / 2, - heightBy / 2);
    newWindow.focus();
  }, interval);

  setTimeout(()=>{
    clearInterval(myInterval);
    newWindow.close();
  }, interval * round);
  // create multiple windows, setTimeout

});

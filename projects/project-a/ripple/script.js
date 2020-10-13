window.addEventListener("click", ()=>{
  //get position of the click
  let x = event.screenX;
  let y = event.screenY;

  let width = 130;
  let height = 180;
  let newWindow = window.open("circle/index.html","","innerHeight="+width+"px, innerWidth="+height+"px, left="+ x +"px, top=" + y + "px");
  let myInterval = setInterval(()=>{
    widthBy = 100;
    heightBy = 100;
    newWindow.resizeBy(widthBy, heightBy);
    newWindow.moveBy(- widthBy / 2, - heightBy / 2);
    newWindow.focus();
  }, 500);
  setTimeout(()=>{
    clearInterval(myInterval);
    newWindow.close();
  },2500);
  // create multiple windows, setTimeout
});

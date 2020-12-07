let socket = io();
let p1 = document.getElementById('p1');
let rollButton = document.getElementById('rollButton');
let sendButton = document.getElementById('sendButton');
let closeButton = document.getElementById('closeButton');
let notesgroundWrapper = document.getElementById('notesgroundWrapper');
let writingPage = document.getElementById('writingPage');
let messagebox = document.getElementById('message');
let color = document.getElementById('input-color');
let font = document.getElementById('select-font');
let size = document.getElementById('input-size');
let paperWrapper = document.getElementById('paperWrapper');
let paper = document.getElementById("content");
let textbox = document.getElementById("content"); // will be redeclared later

let wrapper = document.getElementById("wrapper");
let bgWrapper = document.getElementById("bgWrapper");

let borderWidth = 1;
let noteId = 0;
let state = "p1"
let paperCount = 1;


color.addEventListener("input", () => {
  textbox.style.color = color.value;
});
size.addEventListener("input", () => {
  textbox.style.fontSize = size.value + "px";
});
font.addEventListener("input", () => {
  textbox.style.fontFamily = font.value ;
});

function handlePaperClick(e) {
  console.log("handlePaperClick")
  noteId += 1;
  x = e.clientX - paper.offsetLeft - writingPage.offsetLeft;
  y = e.clientY - paper.offsetTop - writingPage.offsetTop;
  createTextbox(x, y, noteId);
  paper.removeEventListener("click", handlePaperClick);
}
function createTextbox(x, y, noteId) {
  textbox = document.createElement("textarea");
  textbox.id = "textbox" + noteId;
  textbox.style.cssText = "font-style: normal; font-decoration: normal; font-weight: normal; position: absolute; top: "+y+"px; left: "+x+"px; cursor: move; background-color: transparent; border: "+borderWidth+"px solid black; border-radius: 4px; padding: 5px; width: 100px; resize: both; overflow: hidden; font-size: 18px; font-family: sans-serif" // style needs change
  paper.appendChild(textbox);
  textbox.addEventListener("mousedown", initDrag);

  if ( x + textbox.offsetWidth > paper.offsetWidth ) {
    textbox.style.width = (paper.offsetWidth - x) + "px";
  }
  if ( y + textbox.offsetHeight > paper.offsetHeight ) {
    textbox.style.height = (paper.offsetHeight - y) + "px";
  }
  textbox.addEventListener("mouseup", () => {
    if ( textbox.offsetLeft + textbox.offsetWidth > paper.offsetWidth ){
      textbox.style.width = (paper.offsetWidth - textbox.offsetLeft-10) + "px";
    }
    if ( textbox.offsetTop + textbox.offsetHeight > paper.offsetHeight ){
      textbox.style.height = (paper.offsetHeight - textbox.offsetTop-10) + "px";
    }
  });
  // https://www.w3schools.com/howto/howto_js_draggable.asp
}
function initDrag(e) {
  el = textbox;
  console.log("initDrag");
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  // move the DIV from anywhere inside the DIV:
  if (!(( (el.offsetTop + el.offsetHeight - (e.clientY - paper.offsetTop - writingPage.offsetTop)) <= 15) && ( (el.offsetLeft + el.offsetWidth - (e.clientX - paper.offsetLeft -writingPage.offsetLeft)) <= 15) )) {
    el.addEventListener("mousedown", dragMouseDown);
  }
}
function dragMouseDown(e) {
  el = textbox;
  console.log("dragMouseDown");
  e = e || window.event;
  // get the mouse cursor position at startup:
  pos3 = e.clientX;
  pos4 = e.clientY;
  if (!(( (el.offsetTop + el.offsetHeight - (e.clientY - paper.offsetTop -writingPage.offsetTop)) <= 15) && ( (el.offsetLeft + el.offsetWidth - (e.clientX - paper.offsetLeft -writingPage.offsetLeft)) <= 15) )) {
    document.body.addEventListener("mousemove", elementDrag);
    el.addEventListener("mousemove", elementDrag);

    document.body.addEventListener("mouseup", closeDragElement);
    el.addEventListener("mouseup", closeDragElement);
  }
}
function elementDrag(e) {
  el = textbox;
  console.log("elementDrag");
  e = e || window.event;
  e.preventDefault();
  // calculate the new cursor position:
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;
  // set the element's new position:
  if ( !(((el.offsetLeft - pos1) < 0) || ((el.offsetTop - pos2) < 0) || ((el.offsetLeft - pos1)+el.offsetWidth > (paper.offsetWidth) ) || ((el.offsetTop - pos2)+el.offsetHeight > (paper.offsetHeight) )) ) {
    el.style.top = (el.offsetTop - pos2) + "px";
    el.style.left = (el.offsetLeft - pos1) + "px";
  }

}
function closeDragElement() {
  el = textbox;
  console.log("closeDragElement");

  el.removeEventListener("mousemove", elementDrag);
  document.body.removeEventListener("mousemove", elementDrag);
}



rollButton.addEventListener("click",()=>{
  socket.emit("new-paper");
})

socket.on("new-paper-to-all",(count)=>{
  appendPaper(count);
})

function appendPaper(i){
  let newPaper = document.createElement("img");
  newPaper.id = "p"+paperCount;
  newPaper.className = "paper";
  newPaper.src = "img/folded.png";
  paperCount++;
  notesgroundWrapper.appendChild(newPaper);

  destX = Math.random()*90;
  destY = Math.random()*80;
  width = 5 + destY/8;

  var cssAnimation = document.createElement('style');
  cssAnimation.type = 'text/css';
  if (paperCount%2 == 0){
    var rules = document.createTextNode('@keyframes move'+paperCount+
    '{from { left:-10px; } to { left:'+destX+'vw }}');
  }else{
    var rules = document.createTextNode('@keyframes move'+paperCount+
    '{from { right:-10px; } to { right:'+destX+'vw }}');
  }
  cssAnimation.appendChild(rules);
  document.getElementsByTagName("head")[0].appendChild(cssAnimation);

  newPaper.style.width = width + "vw";
  newPaper.style.top = destY + "vh";
  if (paperCount%2 == 0){
    newPaper.style.animation = "1s linear 5 spin1, 5s linear 1 forwards move"+paperCount;
  }else{
    newPaper.style.animation = "1s linear 5 spin2, 5s linear 1 forwards move"+paperCount;
  }

  newPaper.addEventListener("click",()=>{
    paper.addEventListener("click", handlePaperClick);

    notesgroundWrapper.style.visibility="hidden";
    rollButton.style.visibility="hidden";
    writingPage.style.visibility="visible";
    state=newPaper.id;
    socket.emit('get-content',state);
    console.log("emitted get-content")

    sendButton.addEventListener("click",()=>{
      if (textbox.value != ""){
        let data = {paper: state, width:textbox.clientWidth, height:textbox.clientHeight, positionX: textbox.offsetLeft / window.innerWidth * 100, positionY: textbox.offsetTop / window.innerHeight * 100, color: color.value, font: font.value, size: size.value, message: textbox.value};
        socket.emit('message-from-one',data);
      }
      textbox.value = "";
      paper.removeChild(textbox);
      paper.addEventListener("click", handlePaperClick);
      color.value = "#000000";
      size.value = 18;
      font.value = "sans-serif";
    })

    closeButton.addEventListener("click",()=>{
      writingPage.style.visibility="hidden";
      notesgroundWrapper.style.visibility="visible";
      rollButton.style.visibility="visible";
      paper.remove();
      console.log("removed");
      paper = document.createElement("div");
      paper.id="content";
      paperWrapper.prepend(paper);
    })

    console.log("This is "+newPaper.id);
  })
}


socket.on("message-to-all",(data)=>{
  console.log(data);
  let paper = data.paper;
  let width = data.width;
  let height = data.height;
  let positionX = data.positionX;
  let positionY = data.positionY;
  let color = data.color;
  let font = data.font;
  let size = data.size;
  let message = data.message;
  if (state == paper){
    appendMessage(width,height,positionX,positionY,color,font,size,message);
  }
})

function appendMessage(width,height,left,top,valueColor,valueFont,valueSize,message) {
  let textboxFromServer = document.createElement("textarea");
  textboxFromServer.value = message;
  textboxFromServer.style.cssText = "position: absolute; top: "+top+"vh; left: "+left +"vw; cursor: auto; color:"+valueColor+"; background-color: transparent; border: none; padding: 5px; width: "+(width-8)+"px; height:"+(height-8)+"px; resize: none; overflow: hidden; font-size: "+valueSize+"px; font-family: "+valueFont+";" // style needs change
  textboxFromServer.readOnly = true;
  // textboxFromServer.style.top = textboxFromServer.offsetTop + borderWidth + "px";
  // textboxFromServer.style.left = textboxFromServer.offsetLeft + borderWidth + "px";
  paper.appendChild(textboxFromServer);
  console.log("got message")
}



socket.on('paper-list-data',(count)=>{
  if (count!=null){
    for (let i=1; i<=count; i++){
      appendPaper(i);
    }
  }
})

socket.on('archival-data',(dataList)=>{
  if (dataList!=null){
    for(let i=0; i<dataList.length; i++){
      datapoint = dataList[i];
      appendMessage(datapoint.width,datapoint.height,datapoint.positionX,datapoint.positionY,datapoint.color,datapoint.font,datapoint.size,datapoint.message);
    }
  }
})

// paper.addEventListener("keyup",(event)=>{
//   if (event.keyCode == 13){
//     sendButton.click();
//   }
// })

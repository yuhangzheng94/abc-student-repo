// let socket = io();
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
let textbox = document.getElementById("rollButton"); // will be redeclared later

let borderWidth = 1;
let noteId = 0;
let state = "p1"
let paperCount = 1;

paper.addEventListener("click", handlePaperClick);

color.addEventListener("input", () => {
  textbox.style.color = color.value;
});
size.addEventListener("input", () => {
  textbox.style.fontSize = size.value + "px";
});
font.addEventListener("input", () => {
  textbox.style.fontFamily = font.value;
});

function handlePaperClick(e) {
  console.log("handlePaperClick")
  noteId += 1;
  x = e.clientX - paper.offsetLeft;
  y = e.clientY - paper.offsetTop;
  // x = ((e.clientX/window.innerWidth-0.1) * window.innerWidth);
  // y = ((e.clientY/window.innerHeight-0.1) * window.innerHeight);
  createTextbox(x, y, noteId);
  paper.removeEventListener("click", handlePaperClick);
  // resetConfig();
  // showConfig();
}
function createTextbox(x, y, noteId) {
  textbox = document.createElement("textarea");
  textbox.id = "textbox" + noteId;
  textbox.style.cssText = "position: absolute; top: "+y+"px; left: "+x+"px; cursor: move; background-color: transparent; border: "+borderWidth+"px solid black; border-radius: 4px; padding: 5px; width: 100px; resize: both; overflow: hidden; font-size: 12px; font-family: Helvetica" // style needs change
  paper.appendChild(textbox);
  textbox.addEventListener("mouseenter", initDrag);
  // https://www.w3schools.com/howto/howto_js_draggable.asp
}
function initDrag(e) {
  el = textbox;
  console.log("initDrag");
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  // move the DIV from anywhere inside the DIV:
  if (!(( (el.offsetTop + el.offsetHeight - (e.clientY - paper.offsetTop)) <= 15) && ( (el.offsetLeft + el.offsetWidth - (e.clientX - paper.offsetLeft)) <= 15) )) {
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
  if (!(( (el.offsetTop + el.offsetHeight - (e.clientY - paper.offsetTop)) <= 15) && ( (el.offsetLeft + el.offsetWidth - (e.clientX - paper.offsetLeft)) <= 15) )) {
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
  // console.log("clientX: "+pos3+" clientY:"+pos4);
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

function removeTextbox() {

}
function appendMessage(width,height,positionX,positionY,color,font,size,message) {

}




// rollButton.addEventListener("click",()=>{
//   socket.emit("new-paper");
// })
//
// socket.on("new-paper-to-all",(count)=>{
//   appendPaper(count);
// })
//
// function appendPaper(i){
//   let newPaper = document.createElement("img");
//   newPaper.id = "p"+paperCount;
//   newPaper.className = "paper";
//   newPaper.src = "img/folded.png";
//   paperCount++;
//   notesgroundWrapper.appendChild(newPaper);
//
//   destX = Math.random()*90;
//   destY = Math.random()*80;
//   width = 5 + destY/8;
//
//   var cssAnimation = document.createElement('style');
//   cssAnimation.type = 'text/css';
//   if (paperCount%2 == 0){
//     var rules = document.createTextNode('@keyframes move'+paperCount+
//     '{from { left:-10px; } to { left:'+destX+'vw }}');
//   }else{
//     var rules = document.createTextNode('@keyframes move'+paperCount+
//     '{from { right:-10px; } to { right:'+destX+'vw }}');
//   }
//   cssAnimation.appendChild(rules);
//   document.getElementsByTagName("head")[0].appendChild(cssAnimation);
//
//   newPaper.style.width = width + "vw";
//   newPaper.style.top = destY + "vh";
//   if (paperCount%2 == 0){
//     newPaper.style.animation = "1s linear 5 spin1, 5s linear 1 forwards move"+paperCount;
//   }else{
//     newPaper.style.animation = "1s linear 5 spin2, 5s linear 1 forwards move"+paperCount;
//   }
//
//   newPaper.addEventListener("click",()=>{
//     notesgroundWrapper.style.visibility="hidden";
//     rollButton.style.visibility="hidden";
//     writingPage.style.visibility="visible";
//     state=newPaper.id;
//     socket.emit('get-content',state);
//     console.log("emitted get-content")
//
//     sendButton.addEventListener("click",()=>{
//       // writingPage.style.visibility="hidden";
//       // notesgroundWrapper.style.visibility="visible";
//       let message = messagebox.value.trim();
//       if (message != ""){
//         let data = {paper: state, color: color.value, font: font.value, size: size.value, message: message};
//         socket.emit('message-from-one',data);
//       }
//       messagebox.value = "";
//
//     })
//
//     closeButton.addEventListener("click",()=>{
//       writingPage.style.visibility="hidden";
//       notesgroundWrapper.style.visibility="visible";
//       rollButton.style.visibility="visible";
//       paper.remove();
//       console.log("removed");
//       let newDiv = document.createElement("div");
//       newDiv.id="content";
//       paperWrapper.prepend(newDiv)
//     })
//
//     console.log("This is "+newPaper.id);
//   })
// }
//
// socket.on("message-to-all",(data)=>{
//   console.log(data);
//   let paper = data.paper;
//   let color = data.color;
//   let font = data.font;
//   let size = data.size;
//   let message = data.message;
//   if (state == paper){
//     appendMessage(color,font,size,message);
//   }
// })
//
// function appendMessage(color,font,size,message){
//   let div = document.createElement("div");
//   let p = document.createElement("p");
//   p.innerHTML = message;
//   div.style.color = color;
//   p.style.fontFamily = font;
//   div.style.fontSize = size+"px";
//   div.className = "textDiv";
//   div.style.left = Math.random()*60+"vh";
//   div.style.top = Math.random()*70+"vh";
//   div.appendChild(p);
//   let paper = document.getElementById('content');
//   paper.append(div);
//   console.log("got message")
// }
//
//
// socket.on('paper-list-data',(count)=>{
//   if (count!=null){
//     for (let i=1; i<=count; i++){
//       appendPaper(i);
//     }
//   }
// })
//
// socket.on('archival-data',(dataList)=>{
//   if (dataList!=null){
//     for(let i=0; i<dataList.length; i++){
//       datapoint = dataList[i];
//       appendMessage(datapoint.color,datapoint.font,datapoint.size,datapoint.message);
//     }
//   }
// })

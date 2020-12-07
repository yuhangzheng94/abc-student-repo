console.log("hi");
let paper = document.getElementById("paper");
let noteId = 0; // keep track of the numbder of notes
let textbox = document.getElementById("paper"); // will be redeclared later

let config = document.getElementById("config-container");
let inputColor = document.getElementById("input-color");
let inputSize = document.getElementById("input-size");
let btnSubmit = document.getElementById("btnSubmit");

let borderWidth = 1;

let btnB = document.getElementById("btnB");
let btnI = document.getElementById("btnI");
let btnU = document.getElementById("btnU");

paper.addEventListener("click", handlePaperClick);

inputColor.addEventListener("input", () => {
  textbox.style.color = inputColor.value;
});
inputSize.addEventListener("input", () => {
  textbox.style.fontSize = inputSize.value + "px";
});

sendButton.addEventListener("click", () => {
  submit();
  resetConfig();
  hideConfig();
  resetPaper();
});

function handlePaperClick(e) {
  noteId += 1;
  x = e.clientX;
  y = e.clientY;
  createTextbox(x, y, noteId);
  paper.removeEventListener("click", handlePaperClick);
  resetConfig();
  showConfig();
}

function createTextbox(x, y, noteId) {
  textbox = document.createElement("textarea");
  textbox.id = "textbox" + noteId;

  textbox.style.cssText = "autofocus:true; font-style: normal; font-decoration: normal; font-weight: normal; position: absolute; top: "+y+"px; left: "+x+"px; cursor: move; background-color: transparent; border: "+borderWidth+"px solid #ccc; border-radius: 4px; padding: 0px; width: 300px; resize: both; overflow: hidden; font-size: 12px; font-family: Helvetica" // style needs change
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
      textbox.style.width = (paper.offsetWidth - textbox.offsetLeft) + "px";
    }
    if ( textbox.offsetTop + textbox.offsetHeight > paper.offsetHeight ){
      textbox.style.height = (paper.offsetHeight - textbox.offsetTop) + "px";
    }
  });
  // https://www.w3schools.com/howto/howto_js_draggable.asp
}

btnB.addEventListener("click", () => {
  if ( textbox.style.fontWeight == "normal") {
    btnB.style.backgroundColor = "blue";
    btnB.style.color = "white";
    textbox.style.fontWeight = "bold";
  } else if (textbox.style.fontWeight == "bold") {
    btnB.style.backgroundColor = "white";
    btnB.style.color = "black";
    textbox.style.fontWeight = "normal";
  }
})
btnI.addEventListener("click", () => {
  if ( textbox.style.fontStyle == "italic") {
    btnI.style.backgroundColor = "white";
    btnI.style.color = "black";
    textbox.style.fontStyle = "normal";
  } else {
    btnI.style.backgroundColor = "blue";
    btnI.style.color = "white";
    textbox.style.fontStyle = "italic";
  }
})
btnU.addEventListener("click", () => {
  if ( textbox.style.textDecoration == "underline") {
    btnU.style.backgroundColor = "white";
    btnU.style.color = "black";
    textbox.style.textDecoration = "none";
  } else {
    btnU.style.backgroundColor = "blue";
    btnU.style.color = "white";
    textbox.style.textDecoration = "underline";
  }
});

function showConfig() {
  config.style.visibility = "visible";
}
function hideConfig() {
  config.style.visibility = "hidden";
}
function resetConfig() {
  inputColor.value = "#000000";
  inputSize.value = 12;
}

function resetPaper() {
  paper.addEventListener("click", handlePaperClick);
}

function initDrag(e) {
  el = textbox;
  console.log("initDrag");
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  // move the DIV from anywhere inside the DIV:
  if (!(( (el.offsetTop + el.offsetHeight - e.clientY) <= 15) && ( (el.offsetLeft + el.offsetWidth - e.clientX) <= 15) ))
  {
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
  if (!(( (el.offsetTop + el.offsetHeight - e.clientY) <= 15) && ( (el.offsetLeft + el.offsetWidth - e.clientX) <= 15) )) {
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

function removeTextbox() {
  toBeRemoved = document.getElementById("textbox"+noteId);
  console.log("color:" + inputColor.value + "; font-size:" + inputSize.value + "px; position: absolute; top: " + textbox.offsetTop + "px; left:" + textbox.offsetLeft + "px;");

  paper.removeChild(toBeRemoved);
}

let textboxFromServer = document.getElementById("paper");

function createFromServer(valueColor,valueFont,valueSize,message,width,height,left,top) {
  textboxFromServer = document.createElement("textarea");
  textboxFromServer.value = message;
  textboxFromServer.style.cssText = "position: absolute; top: "+top+"vh; left: "+left +"vw; cursor: move; color:"+valueColor+"; background-color: transparent; border-radius: 4px; padding: 5px; width: "+width+"px; height:"+height+"; resize: none; overflow: hidden; font-size: "+valueSize+"px; font-family: "+valueFont+";" // style needs change
  paper.appendChild(textboxFromServer);
  textboxFromServer.readOnly = true;

  textboxFromServer.style.top = textboxFromServer.offsetTop + borderWidth + "px";
  textboxFromServer.style.left = textboxFromServer.offsetLeft + borderWidth + "px";
}


function submit() {
  console.log("color:" + inputColor.value + "; font-size:" + inputSize.value + "px; position: absolute; top: " + textbox.offsetTop + "px; left:" + textbox.offsetLeft + "px;");
  valueColor = inputColor.value;
  valueSize = inputSize.value;
  message = toBeRemoved.value;
  width = toBeRemoved.clientWidth;
  height = toBeRemoved.clientHeight;
  left = toBeRemoved.offsetLeft / window.innerWidth * 100;
  top = toBeRemoved.offsetTop / window.innerHeight * 100;
  removeTextbox();
  createFromServer(valueColor,"Helvetica",valueSize,message,width,height,left,top);
  // text = document.createElement("textarea");
  // text.innerHTML = textbox.value;
  // text.style.cssText = "color:" + inputColor.value + "; font-size:" + inputSize.value + "px; position: absolute; top: " + textbox.offsetTop + "px; left:" + textbox.offsetLeft + "px;";
  // paper.appendChild(text);
  // paper.removeChild(textbox);
  // text.readonly = true;
  // textbox.style.resize = "none";
  // textbox.style.cursor = "auto";
  // textbox.readOnly = true;
  //
  // textbox.style.border = "0";
  // textbox.style.top = textbox.offsetTop + borderWidth + "px";
  // textbox.style.left = textbox.offsetLeft + borderWidth + "px";
  //
  // textbox.removeEventListener("mousedown", dragMouseDown);
  // document.body.removeEventListener("mouseup", closeDragElement);
  // textbox.removeEventListener("mouseup", closeDragElement);
  //
  // let pctPosX = ( textbox.offsetLeft - paper.offsetLeft ) / paper.offsetWidth;
  // let pctPosY = ( textbox.offsetTop - paper.offsetTop ) / paper.offsetHeight;
  // //
  // paper.style.top = paper.offsetTop + 10 + "px";
  // paper.style.left = paper.offsetLeft; + 10 + "px";
  //
  // textbox.style.top = paper.offsetTop + pctPosX + "px";
  // textbox.style.left = paper.offsetLeft; + pctPosY + "px";

}

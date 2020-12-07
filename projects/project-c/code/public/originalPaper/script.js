console.log("hi");

let socket = io();
let radioWrapper = document.getElementById('radioWrapper');
let paperWrapper = document.getElementById('paperWrapper');
let messagebox = document.getElementById('message');
let red = document.getElementById('red');
let blue = document.getElementById('blue');
let paperRadio = document.getElementsByName("paper");
let newButton = document.getElementById('newButton');
let sendbutton = document.getElementById('send');
let color = "black";
let paper = "p1";

//write text onto my paper (determining style)
sendbutton.addEventListener("click",()=>{
  if (red.checked == true){
    color = "red";
  }else if (blue.checked == true){
    color = "blue";
  }
  for(i = 0; i < paperRadio.length; i++) {
      if(paperRadio[i].checked){
        paper = paperRadio[i].value;
      }
  }
  console.log(paper);
  let message = messagebox.value.trim();
  if (message != ""){
    let data = {paper: paper, color: color,message: message};
    socket.emit('message-from-one',data);
  }
  messagebox.value = "";
});

//update others' message on paper
socket.on("message-to-all",(data)=>{
  console.log(data);
  let paper = data.paper;
  let color= data.color;
  let message = data.message;
  appendMessage(paper,color,message);
})



//add new paper
newButton.addEventListener("click",()=>{
  socket.emit("new-paper");
})

socket.on("new-paper-to-all",(count)=>{
  appendPaper(count);
})


function appendMessage(paper,color,message){
  let div = document.createElement("div");
  let p = document.createElement("p");
  p.innerHTML = message;
  div.style.color = color;
  div.appendChild(p);
  document.getElementById(paper).appendChild(div);
}


function appendPaper(i){
  let newDiv = document.createElement("div");
  newDiv.id = "p"+ i;
  newDiv.className = "paper";
  newDiv.innerHTML = "PAPER "+i;
  newDiv.style.cssText = "height: 100px"
  paperWrapper.appendChild(newDiv);
  let newInput = document.createElement("input");
  newInput.id = "p" + i + "-r";
  newInput.value = "p" + i;
  newInput.type = "radio";
  newInput.name = "paper";
  radioWrapper.appendChild(newInput);
  radioWrapper.innerHTML += "paper "+i+" ";
}


//Beginning: get data history
socket.on('paper-list-data',(count)=>{
  if (count!=null){
    for (let i=1; i<=count; i++){
      appendPaper(i);
    }
  }
})

socket.on('archival-data',(data)=>{
  if (data!=null){
    let keys=Object.keys(data);
    for(let i=0; i<keys.length; i++){
      let key = keys[i];
      let datapoint = data[key];
      appendMessage(datapoint.paper,datapoint.color,datapoint.message);
    }
  }
})

//trivial functionality
messagebox.addEventListener("keyup",(event)=>{
  if (event.keyCode == 13){
    sendbutton.click();
  }
})

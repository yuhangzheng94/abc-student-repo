let sh = screen.height;

let myInterval = setInterval(()=>{
  window.resizeBy(0,(sh-400)/4);
},2000);

setTimeout(()=>{
  clearInterval(myInterval);
},8000);

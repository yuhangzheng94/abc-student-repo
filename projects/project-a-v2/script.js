let ripple = document.getElementById('ripple');
let drip = document.getElementById('drip');
let wave = document.getElementById('wave');

let sw = screen.width;
let sh = screen.height;

ripple.addEventListener("click",() => {
  let pond = window.open("ripple/index.html","pond","width="+sw+", height="+sh+", top=0, left=0");
});

wave.addEventListener("click", ()=>{
  let beach = window.open("wave/index.html","","width="+sw+", height="+sh+", top=0, left=0");
});

drip.addEventListener("click", ()=>{
  let drip = window.open("drip/index.html","","width=200,height=200,top=0,left="+(sw/2-100));
});

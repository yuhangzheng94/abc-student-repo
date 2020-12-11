let ripple = document.getElementById('ripple');
let drip = document.getElementById('drip');
let wave = document.getElementById('wave');

let sw = screen.width;
let sh = screen.height;

ripple.addEventListener("click",() => {
  let pond = window.open("ripple/index.html","");
});

wave.addEventListener("click", ()=>{
  let beach = window.open("wave/index.html","","width="+sw+", height="+sh*0.2+", top=0, left=0");
});

drip.addEventListener("click", ()=>{
  let drip = window.open("drip/index.html","","width=200,height=200,top=0,left="+(sw/2-100));
});

console.log("Hello world!");

function addMask(){
  let ww = window.innerWidth;
  let wh = window.innerHeight;
  console.log(ww, wh);

  let maskString1 = document.createElement("div");
  maskString1.style.cssText = "height:" + wh * 0.05 + "px;"
    + "width:" + ww + "px;"
    + "position: fixed; bottom:" + wh * ( 0.6 - 0.1 ) + "px; border-top: 2px solid #cccccc;"
    + "background-color: #ffffff; box-shadow: 5px 5px 5px #000000; z-index: 1";
  console.log(maskString1);
  document.body.appendChild(maskString1);

  let maskString2 = document.createElement("div");
  maskString2.style.cssText = "height:" + wh * 0.05 + "px;"
    + "width:" + ww + "px;"
    + "position: fixed; bottom: 0px; border-bottom: 2px solid #cccccc;"
    + "background-color: #ffffff; box-shadow: -5px -5px 5px #000000; z-index: 1";
  console.log(maskString2);
  document.body.appendChild(maskString2);

  let maskBody1 = document.createElement("div");
  maskBody1.style.cssText = "height:" + wh * 0.55 + "px;"
    + "width:" + ww * 0.8 + "px;"
    + "position: fixed; bottom: 0px; left:" + ww * 0.1 + "px;"
    + "background-color: #88cff9; z-index: 2";
  console.log(maskBody1);
  document.body.appendChild(maskBody1);

  let maskBody2 = document.createElement("div");
  maskBody2.style.cssText = "height:" + wh * 0.05 + "px;"
    + "width:" + ww * 0.8 + "px; border-top: 2px solid #cccccc;"
    + "position: fixed; bottom:" + wh * 0.55 + "px; left:" + ww * 0.1 + "px;"
    + "background-color: #d4f8f9; z-index: 2";
  console.log(maskBody2);
  document.body.appendChild(maskBody2);

  window.addEventListener("resize", ()=>{
    let ww = window.innerWidth;
    let wh = window.innerHeight;
    console.log("resize", ww, wh);
    maskString1.style.height = wh * 0.05 + "px";
    maskString1.style.width = ww + "px";
    maskString1.style.bottom = wh * ( 0.6 - 0.1 ) + "px";
    maskString2.style.height = wh * 0.05 + "px";
    maskString2.style.width = ww + "px";
    maskBody1.style.height = wh * 0.55 + "px";
    maskBody1.style.width = ww * 0.8 + "px";
    maskBody1.style.left = ww * 0.1 + "px";
    maskBody2.style.height = wh * 0.05 + "px";
    maskBody2.style.width = ww * 0.8 + "px";
    maskBody2.style.left = ww * 0.1 + "px";
    maskBody2.style.bottom = wh * 0.55 + "px";

  });

}

// function setOffAlarm() {
//   let warning = document.createElement("audio");
//   warning.setAttribute("src","warning.mp3");
//   warning.play();
// }

function getDizzyWhenReading() {
  //cred to: https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
  document.body.animate([
  // keyframes
  { backgroundColor: "white" },
  { backgroundColor: "red" },
  { backgroundColor: "white" }
], {
  // timing options
  duration: 3000,
  iterations: Infinity
});

  //cred to: https://www.w3schools.com/howto/howto_js_scroll_indicator.asp
  window.addEventListener("scroll", ()=>{
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = winScroll / height;
    document.body.style.filter = "blur(" + 100 * scrolled + "px)";
  });
}

function gotMessage(request, sender, sendResponse){
  console.log(request);
  if (request.wearMask == "yes") {
    addMask();
  }
  else if (request.wearMask == "no") {
    getDizzyWhenReading();
  }
}

chrome.runtime.onMessage.addListener(gotMessage);

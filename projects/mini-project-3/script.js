let box1 = document.getElementById("box1");

let context = new AudioContext();
let destination = context.destination;

let oscillator = context.createOscillator();
oscillator.type = "triangle";

let gain = context.createGain();

oscillator.connect(gain);
gain.connect(destination);

let minHz = 65;
let maxHz = 1050;

let oscillatorStarted = false;

oscillator.frequency.value = minHz;
let rotate = 0;
let width = 100;
let height = 100;
let box1Top = box1.style.top;
let box1Left = box1.style.left;

box1.addEventListener("mousedown",()=>{
  if(!oscillatorStarted){
    oscillator.start(0);
    oscillatorStarted = true;
  }
  gain.gain.value = 1;
  myInterval = setInterval(()=>{
    if (oscillator.frequency.value < maxHz) {
      oscillator.frequency.value += 1;
      console.log(oscillator.frequency.value);
      rotate += 1;
      box1.style.transform = "rotate(" + rotate +"deg)";
      width += 1;
      height += 1;
      box1.style.width = width + "px";
      box1.style.height = height + "px";
      box1Top -= 2;
      box1Left -= 2;
      box1.style.offsetTop = box1Top + "px";
      box1.style.offsetLeft = box1Left + "px";
    }
  },10);
})

box1.addEventListener("mouseup",()=>{
  clearInterval(myInterval);
  myInterval2 = setInterval(()=>{
    if (oscillator.frequency.value > minHz) {
      oscillator.frequency.value -= 1;
      console.log(oscillator.frequency.value);
      rotate -= 1;
      box1.style.transform = "rotate(" + rotate +"deg)";
      width -= 1;
      height -= 1;
      box1.style.width = width + "px";
      box1.style.height = height + "px";
      box1Top += 2;
      box1Left += 2;
      box1.style.offsetTop = box1Top + "px";
      box1.style.offsetLeft = box1Left + "px";
    }
    if (oscillator.frequency.value == minHz) {
      gain.gain.value = 0;
      clearInterval(myInterval2);
    }
  },5);
})

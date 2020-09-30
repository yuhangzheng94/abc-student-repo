let on = document.getElementById("on");
let off = document.getElementById("off");

let context = new AudioContext();
console.log(context);

let oscillator = context.createOscillator();
oscillator.type = "triangle";
oscillator.frequency.value = 440;

let gain = context.createGain();

oscillator.connect(gain);
gain.connect(context.destination);

on.addEventListener("click", ()=> {
  oscillator.start(0);
});

off.addEventListener("click", ()=> {
  oscillator.stop(0);
});

off.addEventListener("click", ()=> {
  gain.gain.value = 0;
});

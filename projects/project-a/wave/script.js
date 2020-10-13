let sw = screen.width;
let sh = screen.height;
let arrayWave = [];
for ( i = 0; i < 10; i++) {
  arrayWave.push("True");
}

window.addEventListener("mousemove", ()=>{
  // coorX = Math.random() * sw;
  // setInterval(()=>{
  //   let x = event.screenX;
  //   coorX = x;
  // },500);
  let x = event.screenX;
  console.log(x);
  let n = Math.floor( x / ( sw / 10) );
  console.log(n);
  if (arrayWave[n] == "True") {
    arrayWave[n] = "False";
    let wave = window.open("wave/index.html","","width="+sw/10+",height=200,top="+sh+",left="+sw/10*n);
    myInterval = setInterval(()=>{
      let heightBy = (sh * 0.8 - 200)/ 5;
      wave.resizeBy(0, heightBy);
    },500);
    setTimeout(()=>{
      let spray = window.open("spray/index.html","","width="+sw/10+",height=160,top="+sh*0.2+",left="+sw/10*n);
      clearInterval(myInterval);
      wave.close();
      setTimeout(()=>{
        spray.close();
      },1500);
  },2500);
  setTimeout(()=>{
    arrayWave[n] = "True";
  },2500);
  }
});

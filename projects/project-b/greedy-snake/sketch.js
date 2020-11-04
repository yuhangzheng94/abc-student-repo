console.log("yo");
let total_list = [];
let img_list = [];
let p_list = [];
let span_list = [];

function go(){
  document.body.style.overflow="hidden";
  // Task A: find all HTML elements before initiating the snake

  // find image list and append to total list
  img_list = document.querySelectorAll("img");
  console.log(img_list);
  img_list.forEach((img_el, i) => {
    if (isInViewport(img_el)){
      total_list.push(img_el);
    }
  });

  // find word list
  // find p list
  findAndReplaceDOMText(document.body, {
    find: /(\w[+#]+|\w+)/g,
    wrap: "span",
    wrapClass: "myWords"
  })
  words = document.getElementsByClassName("myWords");
  for (span_el of words) {
      if (isInViewport(span_el) && (span_el.getBoundingClientRect().left != span_el.getBoundingClientRect().right) && (span_el.getBoundingClientRect().top != span_el.getBoundingClientRect().bottom)){
        total_list.push(span_el);
      };
  }
  // console.log(span_list);

  // // turn p into spans, creds: leoneckert, "text-rain"
  // p_list.forEach((p_el, i) => {
  //   // find words in p element
  //   let text = p_el.textContent;
  //   // empty p element
  //   p_el.textContent = "";
  //   // split words into spans and give it back to p element
  //   let words = text.split(" ");
  //   words.forEach((word, i) => {
  //     let wordspan = document.createElement("span");
  //     wordspan.textContent = word + " ";
  //     p_el.appendChild(wordspan);
  //   });
  // });
  //
  // // find span list and append to total list
  // span_list = document.querySelectorAll("span");
  // console.log(span_list);
  // span_list.forEach((span_el, i) => {
  //   if (isInViewport(span_el) && (span_el.getBoundingClientRect().left != span_el.getBoundingClientRect().right) && (span_el.getBoundingClientRect().top != span_el.getBoundingClientRect().bottom)){
  //     total_list.push(span_el);
  //   }
  // });

}

var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};
// console.log(scrollTop);

var s= function(sketch){
  let scrollTop=window.scrollY;
  let scrollLeft=window.scrollX;

  let numSegments = 10;
  let direction = 'right';

  const xStart = 0; // 蛇的初始 x 坐标
  // const yStart = 20;
  const yStart = window.innerHeight- 60; //蛇的初始 y 坐标
  const diff = 10;

  let xCor = [];
  let yCor = [];

  console.log("viewport is: ("+document.documentElement.clientWidth+","+document.documentElement.clientHeight+")");

  let fruitIndex=Math.floor(Math.random()*total_list.length);
  let fruit = total_list[fruitIndex];

  while ((fruit.getBoundingClientRect().left==0) && (fruit.getBoundingClientRect().top==0) || (fruit.style.visibility == "hidden") || (fruit.style.display == "none") || (fruit.style.opacity == "0")){
    fruitIndex=Math.floor(Math.random()*total_list.length);
    fruit = total_list[fruitIndex];
  }


  let fruitIndexNext=Math.floor(Math.random()*total_list.length);
  let fruitNext = total_list[fruitIndexNext];

  while ((fruitNext == fruit) ||(fruitNext.getBoundingClientRect().left==0) && (fruitNext.getBoundingClientRect().top==0) || (fruitNext.style.visibility == "hidden") || (fruitNext.style.display == "none") || (fruitNext.style.opacity == "0")){
    fruitIndexNext=Math.floor(Math.random()*total_list.length);
    fruitNext = total_list[fruitIndexNext];
  }

  if (Array.prototype.includes.call(img_list,fruit)){
    fruit.animate([{},{ boxShadow: "#ef9702 0px 0px 5px, #ef9702 0px 0px 10px, #ef9702 0px 0px 15px, #ef9702 0px 0px 20px, #ef9702 0px 0px 30px, #ef9702 0px 0px 10px, #ef9702 0px 0px 50px, #ef9702 0px 0px 75px" },{}],{duration: 3000, iterations: Infinity});
  }else{
    fruit.animate([{},{ backgroundColor: "#ef9702" },{}],{duration: 3000, iterations: Infinity});
  }
  console.log("First fruit");
  console.log("fruitIndex is: "+fruitIndex);
  console.log(fruit);
  console.log("fruit in viewport:"+isInViewport(fruit));
  console.log("fruit is: ("+fruit.getBoundingClientRect().left+","+fruit.getBoundingClientRect().top+")");

  let scoreElem;

  sketch.setup=function(){
    scoreElem = sketch.createDiv('Score = 0');
    scoreElem.position(scrollLeft+20, scrollTop+window.innerHeight-40);
    scoreElem.id = 'score';
    scoreElem.style('font-size', '20px');
    scoreElem.style('background-color', 'orange');
    scoreElem.style('color', 'white');
    scoreElem.style('z-index','10000');


    let c=sketch.createCanvas(sketch.windowWidth,sketch.windowHeight);
    c.position(scrollLeft,scrollTop);
    c.style('z-index','100');
    sketch.clear();
    sketch.frameRate(15);
    sketch.stroke(0);
    sketch.strokeWeight(10);
    for (let i = 0; i < numSegments; i++) {
        xCor.push(xStart + i * diff);
        yCor.push(yStart);
      }

  }
  sketch.draw=function(){
    // sketch.background(255);
    sketch.clear();
    for (let i = 0; i < numSegments - 1; i++) {
      sketch.line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
    }
    sketch.updateSnakeCoordinates();
    sketch.checkGameStatus();
    sketch.checkForFruit();

}
  sketch.updateSnakeCoordinates=function(){
    for (let i = 0; i < numSegments - 1; i++) {
      xCor[i] = xCor[i + 1];
      yCor[i] = yCor[i + 1];
    }
    switch (direction) {
      case 'right':
        xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
        yCor[numSegments - 1] = yCor[numSegments - 2];
        break;
      case 'up':
        xCor[numSegments - 1] = xCor[numSegments - 2];
        yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
        break;
      case 'left':
        xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
        yCor[numSegments - 1] = yCor[numSegments - 2];
        break;
      case 'down':
        xCor[numSegments - 1] = xCor[numSegments - 2];
        yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
        break;
    }

  sketch.checkGameStatus=function() {
    if (
      xCor[xCor.length - 1] > sketch.width ||
      xCor[xCor.length - 1] < 0 ||
      yCor[yCor.length - 1] > sketch.height ||
      yCor[yCor.length - 1] < 0 ||
      sketch.checkSnakeCollision()
    ) {
      sketch.noLoop();
      const scoreVal = parseInt(scoreElem.html().substring(8));
      scoreElem.html('Game ended! Your score was : ' + scoreVal);
    }
  }

  sketch.checkSnakeCollision=function() {
    const snakeHeadX = xCor[xCor.length - 1];
    const snakeHeadY = yCor[yCor.length - 1];
    for (let i = 0; i < xCor.length - 1; i++) {
      if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
        return true;
      }
    }
  }
  sketch.checkForFruit=function() {
    let r = 3;
    let x = xCor[xCor.length - 1];
    let y = yCor[yCor.length - 1];
    // collision detection: span
      if ( ( ( y - r < fruit.getBoundingClientRect().top ) && ( y - r > fruit.getBoundingClientRect().bottom) || ( y + r < fruit.getBoundingClientRect().bottom) && ( y + r > fruit.getBoundingClientRect().top) ) && ( (x - r >fruit.getBoundingClientRect().left) && (x - r < fruit.getBoundingClientRect().right) ||      (x+r <fruit.getBoundingClientRect().right) && (x+r > fruit.getBoundingClientRect().left) ) ) {
        fruit.style.visibility = "hidden"; // hide the element once run into
        sketch.fruitEaten();
      }
  }

  sketch.fruitEaten=function(){
    console.log("eat fruit!");
    delete total_list[fruitIndex];
    // returned = total_list.splice(fruitIndex,1);
    // console.log("spliced: ");
    // console.log(returned[0].innerHTML);
    console.log(total_list);
    const prevScore = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Score = ' + (prevScore + 1));
    xCor.unshift(xCor[0]);
    yCor.unshift(yCor[0]);
    numSegments++;
    fruitIndex = fruitIndexNext;
    fruit = fruitNext;
    if (Array.prototype.includes.call(img_list,fruit)){
      fruit.animate([{},{ boxShadow: "#ef9702 0px 0px 5px, #ef9702 0px 0px 10px, #ef9702 0px 0px 15px, #ef9702 0px 0px 20px, #ef9702 0px 0px 30px, #ef9702 0px 0px 10px, #ef9702 0px 0px 50px, #ef9702 0px 0px 75px" },{}],{duration: 3000, iterations: Infinity});
    }else{
      fruit.animate([{},{ backgroundColor: "#ef9702" },{}],{duration: 3000, iterations: Infinity});
    }
    console.log("new fruit");
    console.log("fruitIndex is: "+fruitIndex);
    console.log(fruit);
    console.log("fruit in viewport:"+isInViewport(fruit));
    console.log("fruit now is: ("+fruit.getBoundingClientRect().left+","+fruit.getBoundingClientRect().top+")");
    sketch.updateFruitCoordinates();
}


  sketch.updateFruitCoordinates=function () {
    // let end = true;
    fruitIndexNext = Math.floor(Math.random()*total_list.length);
    fruitNext = total_list[fruitIndexNext];
    // total_list.forEach((el, i) => {
    //   if (el != undefined){
    //     end = false;
    //     // break;
    //   }
    // });
    // if (end){
    //   sketch.noLoop();
    //   scoreElem.html('Congrats!!!! You win!');
    // }

    while ((fruitNext == undefined) || (fruitNext.getBoundingClientRect().left==0) && (fruitNext.getBoundingClientRect().top==0) || (fruitNext.style.visibility == "hidden") || (fruitNext.style.display == "none") || (fruitNext.style.opacity == "0")){
      fruitIndexNext = Math.floor(Math.random()*total_list.length);
      fruitNext = total_list[fruitIndexNext];
      console.log("GETTING A NEW FRUIT!");
    }
  }


  sketch.keyPressed=function(){
    switch (sketch.keyCode) {
      case 37:
        if (direction !== 'right') {
          direction = 'left';
          // console.log("left");
        }
        break;
      case 39:
        if (direction !== 'left') {
          direction = 'right';
          // console.log("right");

        }
        break;
      case 38:
        if (direction !== 'down') {
          direction = 'up';
          // console.log("up");
        }
        break;
      case 40:
        if (direction !== 'up') {
          direction = 'down';
          // console.log("down");
        }
        break;
      }
    }
  }
}
let buffer = "";

document.addEventListener('keypress', logKey);

function logKey(e) {
  console.log( "input: " + e.key );
  buffer += e.key;
  if ( buffer.slice(-5) == "snake") {
    console.log("snake activated");
    go();
    let myp5 = new p5(s);
    // document.removeEventListener('keypress', logKey);
  }
}
// function gotMessage(message,sender,sendResponse){
//   console.log(message);
//   if(message.type == "start"){
//     go();
//     let myp5 = new p5(s);
//     // var x = document.getElementById("myCanvas");
//   }else if(message.type == "stop"){
//     p5=null;
// }
// }
// chrome.runtime.onMessage.addListener(gotMessage);

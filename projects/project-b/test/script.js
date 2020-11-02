// // test A: collision detection
// let object = document.getElementById("object");
//
// let snake = document.createElement("div");
// snake.style.cssText = "position: absolute; top: 650px; left: 900px; width: 5px; height: 30px; background-color: #000000; z-index: 10";
// document.body.appendChild(snake);
// console.log(snake);
//
// let p_list = document.querySelectorAll("img");
// p_list.forEach((p_el) => {
//     console.log(p_el);
//     p_el.style.opacity = "0.8";
//     if ( ( (snake.getBoundingClientRect().top < p_el.getBoundingClientRect().top) && (snake.getBoundingClientRect().top > p_el.getBoundingClientRect().bottom) || (snake.getBoundingClientRect().bottom < p_el.getBoundingClientRect().bottom) && (snake.getBoundingClientRect().bottom > p_el.getBoundingClientRect().top) ) && ( (snake.getBoundingClientRect().left > p_el.getBoundingClientRect().left) && (snake.getBoundingClientRect().left < p_el.getBoundingClientRect().right) ||      (snake.getBoundingClientRect().right < p_el.getBoundingClientRect().right) && (snake.getBoundingClientRect().right > p_el.getBoundingClientRect().left) ) ) {
//
//     p_el.style.visibility = "hidden";
//       }
//
// });






      //wordspan = document.createElement("span") -->span elemnt for each word
      //wordspan.innerHTML = word;
      //p.appendChild(wordspan)

  // let wordSpans = words.map((word)=>{ return "<span>"+word+"</span>"});
  //
  // p.innerHTML = wordSpans.join(" ");
  //
  // span_list = document.querySelectorAll("span");

    let total_list = [];
    let p_list = document.querySelectorAll("p");
    let img_list = document.querySelectorAll("img");

    p_list.forEach((p_el, i) => {
      total_list.push(p_el);
    });
    img_list.forEach((img_el, i) => {
      total_list.push(img_el);
    });

    let span_list = [];

    p_list.forEach((p, i) => {
      let text = p.innerHTML;

      p.innerHTML = "";

      let words = text.split(" ");

      words.forEach((word, i) => {
        let wordspan = document.createElement("span");
        wordspan.innerHTML = word + " ";
        p.appendChild(wordspan);
      });
    });
    span_list = document.querySelectorAll("span");
    console.log(span_list);


//test B: mouse simulates the head of snake
pixel = 5
window.addEventListener("mousemove", ()=> {
  let x = event.clientX;
  let y = event.clientY;
  console.log("x: "+x+",y: "+y);




  // let span_list = p.querySelectorAll("span");

  span_list.forEach( (span) => {
      console.log(span);
      if ( ( ( y < span.getBoundingClientRect().top) && ( y > span.getBoundingClientRect().bottom) || ( y + pixel < span.getBoundingClientRect().bottom) && ( y + pixel > span.getBoundingClientRect().top) ) && ( (x >span.getBoundingClientRect().left) && (x < span.getBoundingClientRect().right) ||      (x+pixel <span.getBoundingClientRect().right) && (x+pixel > span.getBoundingClientRect().left) ) ) {

      span.style.visibility = "hidden";
    }
  });

  img_list.forEach( (span) => {
      console.log(span);
      if ( ( ( y < span.getBoundingClientRect().top) && ( y > span.getBoundingClientRect().bottom) || ( y + pixel < span.getBoundingClientRect().bottom) && ( y + pixel > span.getBoundingClientRect().top) ) && ( (x >span.getBoundingClientRect().left) && (x < span.getBoundingClientRect().right) ||      (x+pixel <span.getBoundingClientRect().right) && (x+pixel > span.getBoundingClientRect().left) ) ) {

      span.style.visibility = "hidden";
      // add score here
    }
  });

});

// task C: let the fruits glow
 let fruit1 = img_list[0];
 let animation = fruit1.animate([{},{ boxShadow: "#ef9702 0px 0px 5px, #ef9702 0px 0px 10px, #ef9702 0px 0px 15px, #ef9702 0px 0px 20px, #ef9702 0px 0px 30px, #ef9702 0px 0px 10px, #ef9702 0px 0px 50px, #ef9702 0px 0px 75px" },{}],{duration: 3000, iterations: Infinity});
// @keyframes sunshine {
//   0% {
//   }
//   50% {
//     text-shadow: #ef9702 0px 0px 5px, #ef9702 0px 0px 10px, #ef9702 0px 0px 15px, #ef9702 0px 0px 20px, #ef9702 0px 0px 30px, #ef9702 0px 0px 10px, #ef9702 0px 0px 50px, #ef9702 0px 0px 75px;
//   }
//   100% {
//   }
// }

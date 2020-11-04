# Greedy Snake
![Pj Preview](https://github.com/mollyhe0523/abc-student-repo/raw/master/projects/pj%20B/snake_gif.gif)
[Download here](https://github.com/mollyhe0523/abc-student-repo/blob/master/projects/pj%20B/greedy_snake.zip)

## Introduction

Have you ever imagined a greedy snake game that eat HTML element on the webpage as its food? This game here allows you to control the greedy snake and swallow as many words/ images as you can!


### How it works:

1. To initiate the snake, simply type the word __*snake*__ on the current page.

2. The food is either a random word or an image on the page and twinkles in orange.

3. Use array keys to control the movement of the snake to eat the food.

4. Have fun!

**Strongly suggest to launch on Wikipedia pages to have a perfect experience.

## Documentation

### Prototype

[link to prototype](https://github.com/mollyhe0523/abc-student-repo/tree/master/projects/pj%20B/prototype)

### Task Breakdown

Molly:

- Task 1: to build the greedy snake.

  Solution: [p5.js snake game](https://p5js.org/examples/interaction-snake-game.html) & switch it to instance mode

  To instantiate a p5 canvas, you only need to make the p5 script into a function, pass in "sketch" when setting the function and put "sketch" before each p5 based function.
  ```javascript
  var s= function(sketch){
    sketch.setup=function(){
      let c=sketch.createCanvas(sketch.windowWidth,sketch.windowHeight);
      c.position(scrollLeft,scrollTop);

      }
    sketch.draw=function(){
      ...
      }
  }
  ```

  Lastly, call this to launch p5.
  ```javascript
  let myp5 = new p5(s);
  ```

- Task 2: to prevent selecting the food that is empty -- its location (0,0). Or is hidden.

  Solution:
  ```javascript
  while ((fruit.getBoundingClientRect().left==0) && (fruit.getBoundingClientRect().top==0) || (fruit.style.visibility == "hidden") || (fruit.style.display == "none") || (fruit.style.opacity == "0")){
    fruitIndex=Math.floor(Math.random()*total_list.length);
    fruit = total_list[fruitIndex];
  }
  ```


Yuhang:

- Task 1: to fetch words and images from HTML.

  Solution: to find image elements, use

  ```javascript
  img_list = document.querySelectorAll("img");
  ```
  to find words list, borrow code from Leon's in-class code "text-rain":

  ```javascript
  // turn p into spans
  p_list.forEach((p_el, i) => {
    // find words in p element
    let text = p_el.textContent;
    // empty p element
    p_el.textContent = "";
    // split words into spans and give it back to p element
    let words = text.split(" ");
    words.forEach((word, i) => {
      let wordspan = document.createElement("span");
      wordspan.textContent = word + " ";
      p_el.appendChild(wordspan);
    });
  });
  ```

- Task 2: to build a collision detection function.

  Solution:
  ```javascript  
  // x, y --> coordinates of snake head, r --> radius
  if ( ( ( y - r < fruit.getBoundingClientRect().top ) && ( y - r > fruit.getBoundingClientRect().bottom) || ( y + r < fruit.getBoundingClientRect().bottom) && ( y + r > fruit.getBoundingClientRect().top) ) && ( (x - r >fruit.getBoundingClientRect().left) && (x - r < fruit.getBoundingClientRect().right) ||      (x+r <fruit.getBoundingClientRect().right) && (x+r > fruit.getBoundingClientRect().left) ) ) {
    fruit.style.visibility = "hidden";
  ```

### Furthur development

- Problem 1: the original way to find words list would break the link and change the style.

  Solution: borrow Leon's in-class code, advanced replacer extension, involving regular expression. (cr: James Padolsey, [findAndReplaceDOMText](https://github.com/padolsey/findAndReplaceDOMText)

  Now it only selects the word on the page.
  ```javascript  
  findAndReplaceDOMText(document.body, {
    find: /(\w[+#]+|\w+)/g,
    wrap: "span",
    wrapClass: "myWords"
  })
  ```


- Problem 2: To initiate the snake using popup window seems annoying.

  Solution: taking Leon's suggestion, detect keypress "snake" to initiate it.

  ```javascript  
  let buffer = "";

  document.addEventListener('keypress', logKey);

  function logKey(e) {
    console.log( "input: " + e.key );
    buffer += e.key;
    if ( buffer.slice(-5) == "snake") {
      console.log("snake activated");
      go();
      let myp5 = new p5(s);
    }
  }
  ```
<br>

Shoutout to Leon and Richard for giving help throughout the making of this project.

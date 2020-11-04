# Greedy Snake

## Introduction

[celebrate/advertise its concept]

Here is how it works:

1. To iniate the snake, type the word __*snake*__ anywhere on the current page.

2. The target can be either a word or an image by random selection. Once selected, it will twinkle in orange.

3. Use array keys to control the movement of the snake.

4. Have fun!

## Documentation

### Prototype

[prototype]

### Task Breakdown

Molly:

- Task 1: to build the greedy snake.

  Solution: [missing solution]

- Task 2: to find the position of the snake head.

  Solution: [missing solution]

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

  Solution: borrow Leon's in-class code, advanced replacer extension, involving regular expression. (cr: James Padolsey, "findAndReplaceDOMText v 0.4.6")

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

Shoutout to Leon and Richard for giving help throughout the making of this project.

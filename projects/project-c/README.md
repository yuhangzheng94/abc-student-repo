# Notes Land
To enter the notes land, click [here](http://notes-land.glitch.me/).

## Introduction

Explore and pass on the little notes. Enjoy!

The notes land is designed to be a trial on anonymity. The inspiration comes from the experience of sneakily passing on little notes in class in one's teenager years. This experience is brought to a broader realm with paper thrown on grass.

|![Pj Preview](https://github.com/mollyhe0523/abc-student-repo/raw/master/projects/pj%20C/demo1.gif)|
|:--:|
| *Writing on one paper* |

|![Pj Preview2](https://github.com/mollyhe0523/abc-student-repo/raw/master/projects/pj%20C/demo2.gif)|
|:--:|
| *Adding other papers* |




## Technical Explanation

### Prototype

[link to prototype](https://github.com/mollyhe0523/abc-student-repo/blob/master/projects/pj%20C/Project%20C%20Prototype.pdf)

### Technical Diagram

1. Add new paper
![Technical Diagram 1](https://github.com/mollyhe0523/abc-student-repo/raw/master/projects/pj%20C/technical.jpeg)

2. Write on the paper
![Technical Diagram 2](https://github.com/mollyhe0523/abc-student-repo/raw/master/projects/pj%20C/technical2.jpeg)

### Technologies Used

- express.js
- socket.io
- Firebase realtime database



### Task Breakdown

__Molly:__

1. Add new paper

  - Server side

    - Get the count of existing paper in the database, update it, and push the information in the paper list.

      ```javascript
      paperListRef.once('value').then((snapshot)=>{
        let paperCount = snapshot.val().count;
        paperCount++;
        let paperName = "p"+paperCount;
        paperListRef.update({
          count: paperCount,
        })
        paperListRef.push({paperName:paperName, active: "y"})
      ```

  - Client side

    - Append paper to the grass with all its required identity, animation, and event listener.


2. Write on the paper

  - Server side
    - Push the message in the message list.

  - Client side

    - Send message to the database and clear the scene (remove the original text area, add event listener of creating new text area and reset config).

    - Append message on the designated paper with all its identity acquired from the database.

      ```javascript
      socket.on("message-to-all",(data)=>{
        let paper = data.paper;
        let width = data.width;
        let height = data.height;
        let positionX = data.positionX;
        let positionY = data.positionY;
        let color = data.color;
        let font = data.font;
        let size = data.size;
        let message = data.message;
        if (state == paper){
          appendMessage(width,height,positionX,positionY,color,font,size,message);
        }
      })
      function appendMessage(width,height,left,top,valueColor,valueFont,valueSize,message) {
        let textboxFromServer = document.createElement("textarea");
        textboxFromServer.value = message;
        textboxFromServer.style.cssText = "position: absolute; top: "+top+"vh; left: "+left +"vw; cursor: auto; color:"+valueColor+"; background-color: transparent; border: none; padding: 5px; width: "+(width-8)+"px; height:"+(height-8)+"px; resize: none; overflow: hidden; font-size: "+valueSize+"px; font-family: "+valueFont+";"
        textboxFromServer.readOnly = true;
        paper.appendChild(textboxFromServer);
      }
      ```

3. Show the different papers’ content

   - Clear the paper once user hits the close button. When the user clicks on one specific paper, fetch the paper content from the database by filtering by its paper name and append it on paper.

    - Server side

     ```javascript
     socket.on('get-content', (paper) =>{
       messageListRef.once('value').then((snapshot)=>{
         let archivalData = snapshot.val();
         if (archivalData != null){
           let keys=Object.keys(archivalData);
           var paperData=[];
           for(let i=0; i<keys.length; i++){
             let key = keys[i];
             let datapoint = archivalData[key];
             if (datapoint.paper==paper){
               paperData.push(datapoint)
             }
           }
           socket.emit('archival-data',paperData);
         }
       })
     })
    ```

__Yuhang:__
1. How to Tame A Textarea Tag

  - I adapted the functions given by w3schools to make the textarea draggable.

  - However, it seems to obstruct the resize function a textarea tag has inherently. I set several if statements, so that if the cursor is within the 15px * 15px range on the lower right corner, the subsequent event listener to enable dragging will not be added.

  ```javascript
  // https://www.w3schools.com/howto/howto_js_draggable.asp
  function initDrag(e) {
    el = textbox;
    console.log("initDrag");
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    // move the DIV from anywhere inside the DIV:
    if (!(( (el.offsetTop + el.offsetHeight - (e.clientY - paper.offsetTop - writingPage.offsetTop)) <= 15) && ( (el.offsetLeft + el.offsetWidth - (e.clientX - paper.offsetLeft -writingPage.offsetLeft)) <= 15) )) {
      el.addEventListener("mousedown", dragMouseDown);
    }
  }
  function dragMouseDown(e) {
    el = textbox;
    console.log("dragMouseDown");
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    if (!(( (el.offsetTop + el.offsetHeight - (e.clientY - paper.offsetTop -writingPage.offsetTop)) <= 15) && ( (el.offsetLeft + el.offsetWidth - (e.clientX - paper.offsetLeft -writingPage.offsetLeft)) <= 15) )) {
      document.body.addEventListener("mousemove", elementDrag);
      el.addEventListener("mousemove", elementDrag);

      document.body.addEventListener("mouseup", closeDragElement);
      el.addEventListener("mouseup", closeDragElement);
    }
  }
  function elementDrag(e) {
    el = textbox;
    console.log("elementDrag");
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    if ( !(((el.offsetLeft - pos1) < 0) || ((el.offsetTop - pos2) < 0) || ((el.offsetLeft - pos1)+el.offsetWidth > (paper.offsetWidth) ) || ((el.offsetTop - pos2)+el.offsetHeight > (paper.offsetHeight) )) ) {
      el.style.top = (el.offsetTop - pos2) + "px";
      el.style.left = (el.offsetLeft - pos1) + "px";
    }
  }
  function closeDragElement() {
    el = textbox;
    console.log("closeDragElement");

    el.removeEventListener("mousemove", elementDrag);
    document.body.removeEventListener("mousemove", elementDrag);
  }

  ```

  - To be more realistic, the textarea should not exceed the boundaries of the paper. So I used some collision detection when creating, dragging, or resizing an textarea tag.

  ```javascript
  function createTextbox(x, y, noteId) {
      textbox = document.createElement("textarea");
      textbox.id = "textbox" + noteId;
      textbox.style.cssText = "font-style: normal; font-decoration: normal; font-weight: normal; position: absolute; top: "+y+"px; left: "+x+"px; cursor: move; background-color: transparent; border: "+borderWidth+"px solid black; border-radius: 4px; padding: 5px; width: 100px; resize: both; overflow: hidden; font-size: 18px; font-family: sans-serif" // style needs change
      paper.appendChild(textbox);
      textbox.addEventListener("mousedown", initDrag);

      if ( x + textbox.offsetWidth > paper.offsetWidth ) {
        textbox.style.width = (paper.offsetWidth - x) + "px";
      }
      if ( y + textbox.offsetHeight > paper.offsetHeight ) {
        textbox.style.height = (paper.offsetHeight - y) + "px";
      }
      textbox.addEventListener("mouseup", () => {
        if ( textbox.offsetLeft + textbox.offsetWidth > paper.offsetWidth ){
          textbox.style.width = (paper.offsetWidth - textbox.offsetLeft-10) + "px";
        }
        if ( textbox.offsetTop + textbox.offsetHeight > paper.offsetHeight ){
          textbox.style.height = (paper.offsetHeight - textbox.offsetTop-10) + "px";
        }
      });
    }
  ```

2. CSS Styling

- The original positioing is not very ideal -- The size of paper and positions of the texts were responsive, yet the font size kept the same, which looked unnatural.

- I use css variable to set the paper and configuration box at fixed width and height that would fit most users' screen size, and then center them in the viewport.

  ```css
  :root {
    --height: 600px;
    --paperWidth: 900px;
    --configWidth: 100px;
  }

  ```


### Shortcomings & Compromises

__Compromises__
  - Delete paper function: Now that all the papers on the grass cannot be deleted. If the function is added, the users will feel more engaged and controlled of the papers.

__Shortcomings__
  - Not responsive on mobile phone.
  - Paper position not fixed on the grass every time user refreshes the page.
  - The whole process could have been more natural, e.g. replacing "Add New Paper" button with an image of a piece of paper, or simulating the action of crumpling and tossing the paper onto the land.

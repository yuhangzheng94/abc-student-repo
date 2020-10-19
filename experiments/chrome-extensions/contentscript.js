console.log("I am here on this website");

function replace(word1,word2){
  let regEx = new RegExp (word1,"g");
  document.body.innerHTML = document.body.innerHTML.replace(regEx,word2);
}

replace("Trump","Red Neck");

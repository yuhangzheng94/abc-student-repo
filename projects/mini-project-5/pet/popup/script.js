console.log("this is popup script");

chrome.runtime.sendMessage( { type: "getMessageList"}, function(response){
  console.log("response is", response.messageList);
  list = response.messageList;
  list.forEach((item, i) => {
    let new_message = document.createElement("li");
    new_message.innerHTML = item;
    document.body.appendChild(new_message);
  });
});

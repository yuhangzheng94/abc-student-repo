let button = document.getElementById('button');

button.addEventListener("click",()=>{
  console.log("POPUP");
  chrome.tabs.query(active:true; activeWindow:true) function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"});
  }
  // chrome.runtime.onMessage.addEventListener(gotMessage);
});

let btnYes = document.getElementById("btn-yes");
let btnNo = document.getElementById("btn-no");

btnYes.addEventListener("click", ()=>{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let message = {
      wearMask: "yes"
    };
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
});

btnNo.addEventListener("click", ()=>{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let message = {
      wearMask: "no"
    };
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
});

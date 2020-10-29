console.log("this is background");

let messageList = [];

chrome.storage.local.get(["history"], function(result) {
  console.log("history: " + result.history);
  if ( result.history == undefined ) {
    chrome.storage.local.set({history: messageList}, function() {
    });
  } else {
    messageList = result.history;
  }
  console.log("message list: ", messageList);
});

chrome.tabs.onMoved.addListener(function(tabId, moveInfo) {
  console.log(tabId);
  console.log(moveInfo);
  chrome.tabs.query({ index: moveInfo.toIndex, windowId: moveInfo.windowId }, function (tabs) {
    let tab = tabs[0];
    var url = new URL(tab.url);
    let hostname = url.hostname; // tab as object
    console.log(hostname);
    var time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let month = time.getMonth() + 1;
    let date = time.getDate();

    new_message = "<span>" + month + "/" + date + " " + hours + ":" + minutes + ":" + seconds + "</span><p>You moved " + hostname.bold() + " without asking for consent. It felt disrespected.</p>";
    messageList.push(new_message);
    console.log(messageList);
  });
});

// chrome.tabs.onHighlighted.addListener( ()=>{
//
// });
//
chrome.tabs.onActivated.addListener( (activeInfo)=>{
  console.log(activeInfo);
  chrome.tabs.query({ active: true, windowId: activeInfo.windowId }, function (tabs) {
    let tab = tabs[0];
    var url = new URL(tab.url);
    let hostname = url.hostname; // tab as object
    console.log(hostname);
    var time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    new_message = "<span>" + month + "/" + date + " " + hours + ":" + minutes + ":" + seconds + "</span><p>Welcome to visit " + hostname.bold() + " . It's happy to see you <3";
    messageList.push(new_message);
    console.log(messageList);
  });
});
//
// chrome.tabs.onDetached.addListener( ()=>{
//
// });
//
chrome.tabs.onAttached.addListener( (tabId, attachInfo)=>{
  console.log(attachInfo);
  chrome.tabs.query({ index: attachInfo.newPosition, windowId: attachInfo.newWindowId }, function (tabs) {
    let tab = tabs[0];
    var url = new URL(tab.url);
    let hostname = url.hostname; // tab as object
    console.log(hostname);
    var time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    new_message = "<span>" + month + "/" + date + " " + hours + ":" + minutes + ":" + seconds + "</span><p>You adopted " + hostname.bold() + " from other windows.";
    messageList.push(new_message);
    console.log(messageList);
  });

});
//
// chrome.tabs.onRemoved.addListener( ()=>{
//
// });
//
// chrome.tabs.onReplaced.addListener( ()=>{
//
// });

// let tabsDict = {};
//
// chrome.tabs.onCreated.addListener( (Tab)=>{
//   console.log(Tab.url);
//   let tab = Tab.openerTabId;
//   var url = new URL(tab.url);
//   let hostname = url.hostname; // tab as object
//   console.log(hostname);
//   if (Tab.openerId != undefined) {
//     new_message = "You adopted a new pet, " + hostname.bold() + ".";
//     messageList.push(new_message);
//     console.log(messageList);
//   }
//
// });
//
// chrome.tabs.onUpdated.addListener( (tabId, changeInfo, tab)=>{
//   console.log("changeInfo: " + changeInfo);
//   console.log(tab);
//   //pin & unpin
//   if ( !(tab.id in Object.keys(tabsDict)) || tabId in Object.keys(tabsDict) && (changeInfo.pinned != tabsDict[tabId].pinned) ) {
//     console.log(changeInfo.pinned);
//     console.log( tabsDict[tabId].pinned);
//
//     if (changeInfo.pinned == true) {
//       console.log(tab.url);
//       let url = new URL(tab.url);
//       let hostname = url.hostname;
//       console.log(hostname);
//
//       new_message = "You pinned " + hostname.bold() + ". It yelled, 'ugh, it hurts!'";
//       messageList.push(new_message);
//       console.log(messageList);
//     } else {
//       console.log(tab.url);
//       var url = new URL(tab.url);
//       let hostname = url.hostname;
//       console.log(hostname);
//
//       new_message = hostname.bold() + " thanked you for unpinning it and feels better now.";
//       messageList.push(new_message);
//       console.log(messageList);
//     }
//   }
//
//   try {
//     tabsDict[tabId] = changeInfo;
//   } catch(err) {
//     tabsDict.put(tabId, changeInfo);
//   }
//
// });
//

//mute & unmute
  // chrome.tabs.query({ muted: true }, function (tabs) {
  //   console.log("tabs:" + tabs);
  //   let tab = tabs[0];
  //   var url = new URL(tab.url);
  //   let hostname = url.hostname; // tab as object
  //   console.log(hostname);
  //
  //   new_message2 = "You muted " + hostname.bold() + " because it was annoying.";
  //   messageList.push(new_message2);
  //   console.log(messageList);
  // });

// });
//   if (changeInfo.MutedInfo.muted == true && changeInfo.MutedInfo.reason == "user") {
//     console.log(tab.url);
//     var url = new URL(tab.url);
//     let hostname = url.hostname;
//     console.log(hostname);
//
//     new_message = "You muted " + hostname.bold() + " because it was annoying.";
//     messageList.push(new_message);
//     console.log(messageList);
//     console.log(changeInfo.pinned);
//   }
//   if (changeInfo.MutedInfo.muted == false) {
//     console.log(tab.url);
//     var url = new URL(tab.url);
//     let hostname = url.hostname;
//     console.log(hostname);
//
//     new_message = "Finally you forgave " + hostname.bold() + " and unmuted it.";
//     messageList.push(new_message);
//     console.log(messageList);
//   }
//

//
// });
//

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  console.log(message);
  if ( message.type == "getMessageList" ) {
    sendResponse( { messageList: messageList } );
  }
});

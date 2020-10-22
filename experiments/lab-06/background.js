console.log("this is background");

let currentValue = 10;

chrome.storage.local.get(['counterValue'], function(result) {
  console.log('Value currently is ' + result.counterValue);
  if (result.counterValue == undefined ) {
    currentValue = 0;
    chrome.storage.local.set({counterValue: currentValue}, function() {
      console.log('Value is set to ' + currentValue);
    });
  } else {
    currentValue = result.counterValue;
  }

});


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  console.log(message);
  if ( message.type == "getCurrentValue" ) {
    sendResponse( { type: "currentValue", value: currentValue } );
  }
  else if (message.type == "increasedValue" ) {
    currentValue += 1;
  }
  chrome.storage.local.set({counterValue: currentValue}, function() {
    console.log('Value is set to ' + value);
  });
});

// background.js
var title;
// Called when the user clicks on the browser action.
// This block is new!
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("request",request);
    if( request.message === "open_new_tab" ){
       title = request.title;
      // console.log(request.title);

    }
    else if(request.message ==="get_title"){
      chrome.runtime.sendMessage({"message": "title_value", "url_value": title});
    }
  }
);

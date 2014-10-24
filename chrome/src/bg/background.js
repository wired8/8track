var settings = new Store("settings", {
    "github_urls": "Please set a github url!",
    "markdown": "Please create your issue markdown!"
});

//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse(settings.toObject());
  });
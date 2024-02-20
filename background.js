chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.url) {
    chrome.tabs.create({url: message.url});
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['content.js']
  });
});
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.request == "isPinnedTab?") {
        sendResponse(sender.tab.pinned);
    }
});
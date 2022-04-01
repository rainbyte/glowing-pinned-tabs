chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.pinned && changeInfo.favIconUrl) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            args: [tab.favIconUrl],
            func: function (faviconUrl) {
                // Remove old favicon
                var nodes = document.querySelectorAll('link[rel*="icon"]');
                for (const node of nodes) {
                    node.parentNode.removeChild(node);
                }

                // Prepare elements and context for drawing
                var canvas = document.createElement("canvas");
                canvas.width = 32;
                canvas.height = 32;
                var ctx = canvas.getContext("2d");
                var link = document.createElement('link');
                link.rel = 'shortcut icon';

                // Create favicon and paint our overlay
                var favicon = new Image(32, 32);
                favicon.src = faviconUrl;
                favicon.setAttribute('crossorigin', 'anonymous');
                favicon.onload = function () {
                    ctx.drawImage(favicon, 0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = "#FF00FF";
                    ctx.fillRect(0, 0, canvas.width, 8);
                    link.href = canvas.toDataURL();
                    document.getElementsByTagName('head')[0].appendChild(link);
                };
                favicon.onerror = function () {
                    ctx.fillStyle = "#FF00FF";
                    ctx.fillRect(0, 0, canvas.width, 8);
                    link.href = canvas.toDataURL();
                    document.getElementsByTagName('head')[0].appendChild(link);
                };
            }
        });
    }
});
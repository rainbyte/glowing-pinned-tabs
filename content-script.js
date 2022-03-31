chrome.runtime.sendMessage({ request: "isPinnedTab?" }, isPinned => {
    if (isPinned){
        const nodes = document.querySelectorAll('link[rel*="icon"]');

        let canvas = document.createElement("canvas");
        canvas.width = 32;
        canvas.height = 32;
        let ctx = canvas.getContext("2d");
        for (const node of nodes) {
            var favicon = new Image(32, 32);
            favicon.src = node.href;
            favicon.setAttribute('crossorigin', 'anonymous');
            favicon.onload = function () {
                ctx.drawImage(favicon, 0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#FF00FF";
                ctx.fillRect(0, 0, canvas.width, 4);
                node.href = canvas.toDataURL();
            };
            favicon.onerror = function () {
                ctx.fillStyle = "#FF0000";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                node.href = canvas.toDataURL();
            };
        }
    }
});

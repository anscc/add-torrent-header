browser.contextMenus.create({
    id: "copy",
    title: "add header",
    contexts: ["selection","link"],
});
browser.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "copy") {
        var text;
        if(info.linkUrl)
            text=info.linkUrl;
        else if(info.selectionText)
            text='magnet:?xt=urn:btih:'+info.selectionText;
          const code = "copyToClipboard(" +
            JSON.stringify(text) + ");";
            
        browser.tabs.executeScript({
            code: "typeof copyToClipboard === 'function';",
        }).then(function(results) {
            if (!results || results[0] !== true) {
                return browser.tabs.executeScript(tab.id, {
                    file: "copytoclipboard.js",
                });
            }
        }).then(function() {
            return browser.tabs.executeScript(tab.id, {
                code,
            });
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    }
});

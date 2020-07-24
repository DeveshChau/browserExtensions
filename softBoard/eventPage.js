chrome.browserAction.onClicked.addListener(function () {
    let tabURL = '';
    let tabTitle = '';
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        tabURL = tabs[0].url;
        tabTitle = tabs[0].title;
    });
    chrome.storage.sync.get(['total', 'urlArray'], function (pins) {
        if (Object.keys(pins).length === 0) {
            chrome.storage.sync.set({
                'total': 1,
                'urlArray': [{ 'title': tabTitle, 'url': tabURL }]
            });
            chrome.browserAction.setBadgeText({ "text": "1" });
        } else {
            pins.total = parseInt(pins.total) + 1;
            pins.urlArray.push({ 'title': tabTitle, 'url': tabURL });
            chrome.storage.sync.set({
                'total': pins.total,
                'urlArray': pins.urlArray
            });
            chrome.browserAction.setBadgeText({ "text": pins.total.toString() });
        }
    })    
})

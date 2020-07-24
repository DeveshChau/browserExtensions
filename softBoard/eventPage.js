browser.browserAction.onClicked.addListener(function () {
    let tabURL = '';
    let tabTitle = '';
    browser.tabs.query({
        active: true,
        currentWindow: true
    }).then((tabs) => {
        tabURL = tabs[0].url;
        tabTitle = tabs[0].title;
    });
    let results = browser.storage.sync.get(['total', 'urlArray']);
    results.then((pins) => {
        if (Object.keys(pins).length === 0) {
            browser.storage.sync.set({
                'total': 1,
                'urlArray': [{ 'title': tabTitle, 'url': tabURL }]
            });
            browser.browserAction.setBadgeText({ "text": "1" });
        } else {
            pins.total = parseInt(pins.total) + 1;
            pins.urlArray.push({ 'title': tabTitle, 'url': tabURL });
            browser.storage.sync.set({
                'total': pins.total,
                'urlArray': pins.urlArray
            });
            browser.browserAction.setBadgeText({ "text": pins.total.toString() });
        }
    });
})

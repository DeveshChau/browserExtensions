function getObjectLength(pins) {
    return pins.total === 0;
}

function setUrlTitle(pins) {
    chrome.storage.sync.set({
        'total': pins.total,
        'urlArray': pins.urlArray
    });
}

function getUrlTitle() {
    chrome.storage.sync.get(['total', 'urlArray'], function (pins) {
        setUrlTitle(pins);
        setBadge(pins.total)
    })
}

function setBadge(badgeTotle) {
    chrome.browserAction.setBadgeText({ "text": badgeTotle.toString() });
}

function urlNotPresent(pins, tabURL) {
    return !pins.urlArray.find(obj => obj.url === tabURL )
}

setUrlTitle({ 'total': 120, 'urlArray': [] });
setBadge(120);
chrome.browserAction.onClicked.addListener(function () {

    let tabTitle = '';
    let tabURL = '';
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        tabTitle = tabs[0].title;
        tabURL = tabs[0].url;
    });
    chrome.storage.sync.get(['total', 'urlArray'], function (pins) {
        if (getObjectLength(pins)) {
            console.log('limit end');
        } else if (urlNotPresent(pins, tabURL)) {
            pins.total = pins.total - 1;
            pins.urlArray.push({ 'title': tabTitle, 'url': tabURL });
            setUrlTitle(pins);
            setBadge(pins.total);
        }
    })
});

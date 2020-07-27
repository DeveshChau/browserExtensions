let pinsArray = [];
function setSoftBoard() {
    chrome.storage.sync.get(['total', 'urlArray'], function (urls) {
        if (urls.total === 0) {
            let message = document.createElement('div');
            const node = document.createTextNode('No more pins available');
            message.appendChild(node);
            element = document.getElementById('container')
            child = document.getElementById("pins");
            element.insertBefore(message, child);
        }
        pinsArray = [...urls.urlArray];
        for (let i = 0; i < pinsArray.length; i++) {

            let col = document.createElement("DIV");
            col.setAttribute("class", "col-sm-3");

            let card = document.createElement("DIV");
            card.setAttribute("class", "card border-primary mb-3");

            let header = document.createElement("DIV");
            header.setAttribute("class", "card-header");
            let headernode = document.createTextNode("#" + (i + 1));
            header.appendChild(headernode);

            let body = document.createElement("DIV");
            body.setAttribute("class", "card-body text-success");

            let title = document.createElement("H5");
            title.setAttribute("class", "card-title");
            let titlenode = document.createTextNode(pinsArray[i].title);
            title.appendChild(titlenode);

            let link = document.createElement("a");
            link.setAttribute("class", "card-text");
            let urlnode = document.createTextNode(pinsArray[i].url);
            link.href = pinsArray[i].url;
            link.appendChild(urlnode);

            body.appendChild(title);
            body.appendChild(link);

            card.appendChild(header);
            card.appendChild(body);


            let pin = document.getElementById('pins');
            pin.appendChild(col).appendChild(card);
        }
    });
}

document.getElementById('reset').onclick = function () {
    chrome.storage.sync.set({
        'total': 2,
        'urlArray': []
    });
    document.getElementById('container').remove();
    chrome.browserAction.setBadgeText({ "text": '2' });
    chrome.browserAction.setBadgeBackgroundColor({color: "blue"});
    chrome.browserAction.setTitle({title: 'Soft Board'});
};

setSoftBoard();

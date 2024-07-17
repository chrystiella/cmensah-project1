document.addEventListener('DOMContentLoaded', function() {
    function Story(title, body, linkUrl, imageUrl) {
        this.title = title;
        this.body = body;
        this.linkUrl = linkUrl;
        this.imageUrl = imageUrl;
    }

    function initializePage() {
        addEventListeners();
        fetchFeedItems();
    }

    function addEventListeners() {
        let portalButton = document.getElementById('portal_button');
        if (portalButton) {
            portalButton.addEventListener('click', goToMaristPortal);
        }

        let portalButtonText = document.getElementById('portal_button_text');
        if (portalButtonText) {
            portalButtonText.addEventListener('click', goToMaristPortal);
        }
    }

    function fetchFeedItems() {
        fetch('/api/feed')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    displayItem(item);
                });
            });
    }

    function displayItem(feedItem) {
        let newsfeedElement = document.getElementById('newsfeed');
        if (newsfeedElement) {
            let itemHTML = `
                <div class="feed-item">
                    <h2 class="small-title"><a href="${feedItem.linkUrl}" target="_blank">${feedItem.title}</a></h2>
                    <p>${feedItem.body}</p>
                    <a href="${feedItem.linkUrl}" target="_blank">
                        <img src="${feedItem.imageUrl}" alt="${feedItem.title}" style="max-width: 15%; height: auto;">
                    </a>
                    <hr>
                </div>
            `;
            
            newsfeedElement.innerHTML += itemHTML;
        }
    }

    function goToMaristPortal() {
        goToLocation('http://my.marist.edu');
    }

    function goToLocation(url) {
        window.location.href = url;
    }

    initializePage();
});

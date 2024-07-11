document.addEventListener('DOMContentLoaded', function() {
    function Story(title, body, linkUrl, imageUrl) {
        this.Title = title;
        this.Body = body;
        this.linkUrl = linkUrl;
        this.imageUrl = imageUrl;
    }

    function initializePage() {
        addEventListeners();
        removeNewsfeed();
        makeNews();
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

    function removeNewsfeed() {
        let newsfeedElement = document.getElementById('newsfeed');
        if (newsfeedElement) {
            newsfeedElement.innerHTML = '';
        }
    }

    function makeNews() {
        let currentNews = [
            new Story('Campus', 'Would you like to see more info on the campus? Click above!', 'https://www.marist.edu/about/map', 'images/marist_college.jpg'),
            new Story('News', 'Do you want to know what happens on and off campus? Press the link above!', 'https://www.marist.edu/news', 'images/news_pic.jpg'),
            new Story('Hancock Center', 'Find more information about the Hancock Center above!', 'https://www.marist.edu/management/investment-center', 'images/hancock.jpeg')
        ];

        currentNews.forEach(function(item) {
            displayItem(item);
        });
    }

    function displayItem(feedItem) {
        let newsfeedElement = document.getElementById('newsfeed');
        if (newsfeedElement) {
            let itemHTML = `
                <div class="feed-item">
                    <h2 class="small-title"><a href="${feedItem.linkUrl}" target="_blank">${feedItem.Title}</a></h2>
                    <p>${feedItem.Body}</p>
                    <a href="${feedItem.linkUrl}" target="_blank">
                        <img src="${feedItem.imageUrl}" alt="${feedItem.Title}" style="max-width: 15%; height: 15;">
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

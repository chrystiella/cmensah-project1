let feedItems = [
    {
        id: '1',
        title: 'Campus',
        body: 'Would you like to see more info on the campus? Click above!',
        linkUrl: 'https://www.marist.edu/about/map',
        imageUrl: '../images/marist_college.jpg'
    },
    {
        id: '2',
        title: 'News',
        body: 'Do you want to know what happens on and off campus? Press the link above!',
        linkUrl: 'https://www.marist.edu/news',
        imageUrl: '../images/news_pic.jpg'
    },
    {
        id: '3',
        title: 'Hancock Center',
        body: 'Find more information about the Hancock Center above!',
        linkUrl: 'https://www.marist.edu/management/investment-center',
        imageUrl: '../images/hancock.jpeg'
    }
];

let nextId = 4;

exports.getAllFeedItems = () => feedItems;

exports.addFeedItem = (feedItem) => {
    feedItem.id = String(nextId++);
    feedItems.push(feedItem);
};

exports.deleteFeedItem = (id) => {
    feedItems = feedItems.filter(item => item.id !== id);
};

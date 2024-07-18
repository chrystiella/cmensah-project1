const feedItem = require('../models/feedItem');

const currentStories = [];

const item1 = feedItem.createFeedItem("Campus", "Would you like to see more info on the campus? Click above!", "https://www.marist.edu/about/map", "images/maristbackground.png");
const item2 = feedItem.createFeedItem("News", "Do you want to know what happens on and off campus? Press the link above!", "https://www.marist.edu/news", "images/news_pic.jpg");
const item3 = feedItem.createFeedItem("Hancock Center", "Find more information about the Hancock Center above!", "https://www.marist.edu/management/investment-center", "images/hancock.jpeg");
const item4 = feedItem.createFeedItem("Sports", "Sports information on our wonderful red foxes above!", "https://goredfoxes.com/", "images/sports.jpg");

currentStories.push(item1, item2, item3, item4);

// GET /api/feed - Get all feed items
exports.getAllFeedItems = (req, res) => {
    res.status(200).json(currentStories);
};

// GET /api/feed/:feedItemID - Get a single feed item by ID
exports.getFeedItem = (req, res) => {
    const feedItemID = parseInt(req.params.feedItemID, 10);
    if (isNaN(feedItemID) || feedItemID < 0 || feedItemID >= currentStories.length) {
        return res.status(404).json({ error: 'Feed item not found' });
    }
    res.status(200).json(currentStories[feedItemID]);
};

// POST /api/feed - Save a new feed item
exports.saveFeedItem = (req, res) => {
    const { title, body, linkUrl, imageUrl } = req.body;
    if (!title || !body || !linkUrl || !imageUrl) {
        return res.status(400).json({ error: 'Invalid feed item data' });
    }
    const newFeedItem = feedItem.createFeedItem(title, body, linkUrl, imageUrl);
    currentStories.push(newFeedItem);
    res.status(201).json(currentStories);
};

// DELETE /api/feed/:feedItemID - Delete a feed item by ID
exports.deleteFeedItem = (req, res) => {
    const feedItemID = parseInt(req.params.feedItemID, 10);
    if (isNaN(feedItemID) || feedItemID < 0 || feedItemID >= currentStories.length) {
        return res.status(404).json({ error: 'Feed item not found' });
    }
    currentStories.splice(feedItemID, 1);
    res.status(200).json(currentStories);
};

// PATCH /api/feed/:feedItemID - Update a feed item by ID
exports.updateFeedItem = (req, res) => {
    const feedItemID = parseInt(req.params.feedItemID, 10);
    if (isNaN(feedItemID) || feedItemID < 0 || feedItemID >= currentStories.length) {
        return res.status(404).json({ error: 'Feed item not found' });
    }

    const updatedFeedItem = currentStories[feedItemID];

    const { title, body, linkUrl, imageUrl } = req.body;
    if (title) updatedFeedItem.title = title;
    if (body) updatedFeedItem.body = body;
    if (linkUrl) updatedFeedItem.linkUrl = linkUrl;
    if (imageUrl) updatedFeedItem.imageUrl = imageUrl;

    res.status(200).json(updatedFeedItem);
};

// PUT /api/feed/:feedItemID - Replace a feed item by ID
exports.replaceFeedItem = (req, res) => {
    const feedItemID = parseInt(req.params.feedItemID, 10);
    if (isNaN(feedItemID) || feedItemID < 0 || feedItemID >= currentStories.length) {
        return res.status(404).json({ error: 'Feed item not found' });
    }

    const { title, body, linkUrl, imageUrl } = req.body;
    if (!title || !body || !linkUrl || !imageUrl) {
        return res.status(400).json({ error: 'Invalid feed item data' });
    }

    const updatedFeedItem = {
        title,
        body,
        linkUrl,
        imageUrl
    };

    currentStories[feedItemID] = updatedFeedItem;

    res.status(200).json(updatedFeedItem);
};

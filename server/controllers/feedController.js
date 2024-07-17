var feedItem = require('../models/feedItem');

// Initialize an empty array to hold feed items
var currentStories = [];

// Create instances of feedItem and add them to the array
let item1 = feedItem.createFeedItem("Campus", "Would you like to see more info on the campus? Click above!", "https://www.marist.edu/about/map", "images/marist_college.jpg");
let item2 = feedItem.createFeedItem("News", "Do you want to know what happens on and off campus? Press the link above!", "https://www.marist.edu/news", "images/news_pic.jpg");
let item3 = feedItem.createFeedItem("Hancock Center", "Find more information about the Hancock Center above!", "https://www.marist.edu/management/investment-center", "images/hancock.jpeg");
let item4 = feedItem.createFeedItem("Sports", "Sports information on our wonderful red foxes above!", "https://goredfoxes.com/", "images/sports.jpg");

currentStories.push(item1);
currentStories.push(item2);
currentStories.push(item3);
currentStories.push(item4);

// GET /api/feed - Get all feed items
exports.getAllFeedItems = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(currentStories);
}

// GET /api/feed/:feedItemID - Get a single feed item by ID
exports.getFeedItem = function (req, res) {
    const feedItemID = parseInt(req.params.feedItemID);
    if (isNaN(feedItemID) || feedItemID < 0 || feedItemID >= currentStories.length) {
        return res.status(404).send({ error: 'Feed item not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(currentStories[feedItemID]);
}

// POST /api/feed - Save a new feed item
exports.saveFeedItem = function (req, res) {
    let newFeedItem = feedItem.createFeedItem(req.body.title, req.body.body, req.body.linkUrl, req.body.imageUrl);
    currentStories.push(newFeedItem);
    res.setHeader('Content-Type', 'application/json');
    res.send(currentStories);
}

// DELETE /api/feed/:feedItemID - Delete a feed item by ID
exports.deleteFeedItem = function (req, res) {
    const feedItemID = parseInt(req.params.feedItemID);
    if (isNaN(feedItemID) || feedItemID < 0 || feedItemID >= currentStories.length) {
        return res.status(404).send({ error: 'Feed item not found' });
    }
    currentStories.splice(feedItemID, 1);
    res.setHeader('Content-Type', 'application/json');
    res.send(currentStories);
}

// PATCH /api/feed/:feedItemID - Update a feed item by ID
exports.updateFeedItem = function (req, res) {
    const feedItemID = parseInt(req.params.feedItemID);
    if (isNaN(feedItemID) || feedItemID < 0 || feedItemID >= currentStories.length) {
        return res.status(404).send({ error: 'Feed item not found' });
    }

    // get the existing feed item from the array
    var updatedFeedItem = currentStories[feedItemID];

    // check to see what has been passed and update the local copy
    if (req.body.title) updatedFeedItem.title = req.body.title;
    if (req.body.body) updatedFeedItem.body = req.body.body;
    if (req.body.linkUrl) updatedFeedItem.linkUrl = req.body.linkUrl;
    if (req.body.imageUrl) updatedFeedItem.imageUrl = req.body.imageUrl;

    // save the local copy of the feed item back into the array
    currentStories[feedItemID] = updatedFeedItem;

    res.setHeader('Content-Type', 'application/json');
    res.send(currentStories[feedItemID]);
}

// PUT /api/feed/:feedItemID - Replace a feed item by ID
exports.replaceFeedItem = function (req, res) {
    const feedItemID = parseInt(req.params.feedItemID);
    if (isNaN(feedItemID) || feedItemID < 0 || feedItemID >= currentStories.length) {
        return res.status(404).send({ error: 'Feed item not found' });
    }

    // ensure all required fields are provided
    if (req.body.title && req.body.body && req.body.linkUrl && req.body.imageUrl) {
        var updatedFeedItem = {
            title: req.body.title,
            body: req.body.body,
            linkUrl: req.body.linkUrl,
            imageUrl: req.body.imageUrl
        };

        // save the local copy of the feed item back into the array
        currentStories[feedItemID] = updatedFeedItem;

        res.setHeader('Content-Type', 'application/json');
        res.send(currentStories[feedItemID]);
    } else {
        res.status(400).send({ error: 'Invalid feed item data' });
    }
}

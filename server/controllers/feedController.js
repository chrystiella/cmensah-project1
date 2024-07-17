const feedModel = require('../models/feedItem');

exports.getAllFeedItems = (req, res) => {
    res.json(feedModel.getAllFeedItems());
};

exports.addFeedItem = (req, res) => {
    const newItem = req.body;
    feedModel.addFeedItem(newItem);
    res.status(201).json(newItem);
};

exports.deleteFeedItem = (req, res) => {
    const itemId = req.params.id;
    feedModel.deleteFeedItem(itemId);
    res.status(204).end();
};

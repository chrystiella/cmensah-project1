const express = require('express')
const router = express.Router();
let feedController = require("../controllers/feedController.js");



router.route('/')
    .get(feedController.getAllFeedItems)
    .post(feedController.getAllFeedItems)

    router.route('/:feedItemID')
    .get(feedController.getFeedItem)
    .delete(feedController.deleteFeedItem)
    .patch(feedController.updateFeedItem)
    .put(feedController.replaceFeedItem)


module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const feedController = require('./controllers/feedController');

const app = express();
const port = 1337;

app.use(bodyParser.json());
app.use(express.static('client/public'));

// Serve HTML files
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: './client/views' });
});

app.get('/feed', function(req, res) {
    res.sendFile('feed.html', { root: './client/views' });
});

// API endpoints
app.get('/api/feed', feedController.getAllFeedItems);
app.get('/api/feed/:feedItemID', feedController.getFeedItem);
app.post('/api/feed', feedController.saveFeedItem);
app.delete('/api/feed/:feedItemID', feedController.deleteFeedItem);
app.patch('/api/feed/:feedItemID', feedController.updateFeedItem);
app.put('/api/feed/:feedItemID', feedController.replaceFeedItem);

app.listen(port, () => console.log(`Listening on port ${port}.`));

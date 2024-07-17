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
app.post('/api/feed', feedController.addFeedItem);
app.delete('/api/feed/:id', feedController.deleteFeedItem);

app.listen(port, () => console.log(`Listening on port ${port}.`));

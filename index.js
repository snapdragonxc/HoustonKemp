var express = require('express');
var path = require('path');
var api = require('./api');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // gives req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', api); // 
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.listen(8080, () => {
    console.log('Listening on port 8080');
})
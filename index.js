require('debug'),
        ejs = require('ejs'),
        express = require('express'),
        bodyParser = require('body-parser'),
        path = require('path'),
        config = require('./config'),
        app = express(),
        router = express.Router();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

console.log(__dirname);

app.get('/', function (req, res) {
        res.render('index');
});

app.use(express.static(__dirname + '/public'));

app.listen(config.port, function() {
        console.log('Express serving on port ' + config.port);
});

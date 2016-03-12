var     debug = require('debug'),
        ejs = require('ejs'),
        express = require('express'),
        bodyParser = require('body-parser'),
        path = require('path'),
        config = require('./config'),
        cookieSession = require('cookie-session'),
        app = express(),
        router = express.Router(),
        env = process.env.NODE_ENV || "development",
        models = require("./models");

var user = models.user;
var questions = models.questions;
var accounts = models.accounts;
var idcounter = models.idcounter;

var pageviews = 0;
var sessionid = 0;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.get('/', function (req, res) {
        res.render('index');
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(router);

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
        name: 'session',
        keys: ['key1', 'key2']
}));

app.use(function (req, res, next) {
        req.session.views = (req.session.views || 0) + 1
        pageviews = req.session.views;
        if(pageviews == 1){

        }
        else{

        }

        req.session.id = 123123;
        sessionid = req.session.id;
        next();
});

app.post('/account', function(req, res) {
        var username = req.body.user;
        var password = req.body.pass;
        res.render('survey', { uname : username , pviews : pageviews, sid : sessionid });
});

app.listen(config.port, function() {
        debug('Express serving on port ' + config.port);
});

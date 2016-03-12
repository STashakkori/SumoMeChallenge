var path      = require('path');
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var dbconfig  = require(__dirname + '/../dbconfig/config.json')[env];

var mysql = require('mysql');

var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        multipleStatements: true
});

connection.connect();
connection.query('drop database if exists sumo;');
connection.query('create database sumo;');
connection.query('use sumo;');
connection.query('create table if not exists users(' +
                        'sid int unsigned not null,' +
                        'pviews int,' +
                        'primary key(sid)' +
                 ');'
);

connection.query('create table if not exists questions(' +
                         'qid int unsigned not null,' +
                         'body text,' +
                         'primary key(qid)' +
                 ');'
);

connection.query('create table if not exists accounts(' +
                        'username varchar(50),' +
                        'password varchar(50),' +
                        'isadmin bool' +
                ');'
);

connection.query('create table if not exists answers(' +
                         'userssid int unsigned not null,' +
                         'questionsqid int unsigned not null,' +
                         'body text,' +
                         'foreign key(userssid) references users(sid),' +
                         'foreign key(questionsqid) references questions(qid),' +
                         'primary key(userssid, questionsqid)' +
                 ');'
);

connection.query('create table if not exists usercount(' +
                        'counter int' +
                ');'
);

connection.end();

var sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, dbconfig,
        {
                host: 'localhost',
                dialect: 'mysql',
                pool: false
        }
);

//Checking connection status
sequelize.authenticate().complete(function (err) {
        if (err) {
                console.log('There is connection in ERROR');
        } else {
                console.log('Connection has been established successfully');
        }
});

var users = sequelize.define('users', {
                sid:    { type: Sequelize.INTEGER, unique : true },
                pviews: { type: Sequelize.INTEGER, defaultValue: 0 }
        }
);

var questions  = sequelize.define('questions', {
                question:       { type: Sequelize.TEXT },
        }
);

var accounts = sequelize.define('account', {
                username:       { type: Sequelize.STRING },
                password:       { type: Sequelize.STRING },
                isAdmin:        { type: Sequelize.BOOLEAN }
        }
);

accounts.sync({ force: true }).then(function () {
        accounts.create({
                username: 'admin',
                password: 'sumo',
                isAdmin: true
        });
});

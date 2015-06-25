console.log('Loading express server...');

var path = require('path');
var pkg = require(path.resolve('./package.json'));
var express = require('express');
var favicon = require('serve-favicon');
var api = require('../api/testapi'); // Runs restify api in tandem
var app = express();


app.use('/', express.static('./build/'));

// app.use(express.static('build/images'));

app.use('/bower_components',  express.static('bower_components'));
app.use('/node_modules',  express.static('node_modules'));
app.use('/build', express.static('build'));
app.use(favicon(__dirname + '/favicon.ico'));

app.get('/', function(req, res)
{
	console.log("app::get/");
	//res.send('Default Express server response. Perhaps you should run grunt serve --dev or --build');
	res.sendFile('/demo/index.html');
});

app.use(function(req, res, next)
{
    var path = require('path');
    var file = path.join(process.cwd(), '/demo/', 'index.html');
    res.sendFile(file);
});


var port = 9699;
app.listen(port, function()
{
    console.log('Demo server started on port ' + port);
});

/**
 * Module dependencies.
 */
var express = require('express');
var main = require('./routes');
var pd = require('./routes/pd');
var http = require('http');
var path = require('path');
var dust = require('dustjs-linkedin');
var cons = require('consolidate');
var app = express();

// app configuration
// assign the dust engine to .html files
app.engine("html", cons.dust);

// all environments
app.set('port', process.env.PORT || 4500);

// app configuration
// assign the dust engine to .html files
app.engine("html", cons.dust);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('template_engine', "dust");
app.use('/', app.router);
app.use(express.bodyParser());
app.use(express.logger('dev'));

// set up routes
app.get("/", main.index);

// id is dynamic
app.get('/product/:pid', pd.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

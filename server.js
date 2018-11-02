const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Iver4son3!",
  database: "arlington_nightlife"
});

app.use(express.static(__dirname + '/public' ));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());
app.use(require('morgan')('dev'));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect('mongodb://localhost/passport-tutorial');
mongoose.set('debug', true);

require('./models/Users');
require('./config/passport');
app.use(require('./routes'));

app.get('/events', function (req, res) {
	const eventType = req.query.eventType;

	con.query("SELECT venues.id as venue_id, name as venue_name, DATE_FORMAT(start_time, '%l:%i %p') as start_time, DATE_FORMAT(end_time, '%l:%i %p') as end_time FROM events, venues WHERE venues.id = events.venue_id AND type = ?", [eventType], function (err, result, fields) {
		if (err) throw err;
		res.send(result);
	});
});

app.post('/events', function (req, res) { 
	const body = req.body
	
	const eventType = body.eventType
	const venueId = body.venue
	const startTime = body.startTime
	const endTime = body.endTime
	
	con.query("INSERT into events (type, start_time, end_time, venue_id) VALUES (?, STR_TO_DATE(?, '%M %e, %Y %T'), STR_TO_DATE(?, '%M %e, %Y %T'), ?)", [eventType, startTime, endTime, venueId], function (err, result, fields) {
		if (err) throw err;
		res.send(result);
	});
});

app.get('/venues', function (req, res) { 
	const venueId = req.params.id;

	con.query("SELECT id, name FROM venues", function (err, result, fields) {
		if (err) throw err;
		res.send(result);
	});
});

app.get('/venue/:id', function (req, res) { 
	const venueId = req.params.id;

	con.query("SELECT name, address, phone_num FROM venues where id = ?", [venueId], function (err, result, fields) {
		if (err) throw err;
		res.send(result);
	});
});

app.post('/venues', function (req, res) { 
	const body = req.body
	
	const name = body.name
	const address = body.address
	const phone = body.phone
	
	con.query("INSERT into venues (name, address, phone_num) VALUES (?, ?, ?)", [name, address, phone], function (err, result, fields) {
		if (err) throw err;
		res.send(result);
	});
});

con.connect(function(err) {
  if (err) throw err;
});

//Error handlers & middlewares
if(!isProduction) {
	app.use((err, req, res, next) => {
		res.status(err.status || 500);

		res.json({
			errors: {
				message: err.message,
				error: err
			},
		});
	});
}

app.use((err, req, res, next) => {
	res.status(err.status || 500);

	res.json({
		errors: {
			message: err.message,
			error: {}
		},
	});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const mysql = require('mysql');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

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

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Iver4son3!",
  database: "arlington_nightlife"
});

require('./models/Users');
require('./config/passport');
app.use(require('./routes')(conn));

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
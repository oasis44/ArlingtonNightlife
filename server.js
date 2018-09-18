const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Iver4son3!",
  database: "arlington_nightlife"
});

app.use(express.static(__dirname + '/public' ));

app.get('/events', function (req, res) { 
	con.query("SELECT name as venue_name, DATE_FORMAT(start_time, '%l:%i %p') as start_time, DATE_FORMAT(end_time, '%l:%i %p') as end_time FROM events, venues WHERE venues.id = events.venue_id AND type = '" + req.query.eventType + "';", function (err, result, fields) {
		if (err) throw err;
		res.send(result);
	});
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM events WHERE type = 'Happy Hour'", function (err, result, fields) {
    if (err) throw err;
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
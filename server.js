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

app.get('/blah', function (req, res) { 
	con.query("SELECT * FROM events WHERE type = 'Happy Hour'", function (err, result, fields) {
		if (err) throw err;
		console.log(result);
		res.send(result);
	});
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM events WHERE type = 'Happy Hour'", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
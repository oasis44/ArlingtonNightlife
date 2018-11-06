const router = require('express').Router();
const auth = require('../auth');
const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Iver4son3!",
  database: "arlington_nightlife"
});

router.get('/', auth.optional, function (req, res, next) { 
	const venueId = req.params.id;

	con.query("SELECT id, name FROM venues", function (err, result, fields) {
		if (err) throw err;
		res.send(result);
	});
});

router.get('/:id', auth.optional, function (req, res, next) { 
	const venueId = req.params.id;

	con.query("SELECT name, address, phone_num FROM venues where id = ?", [venueId], function (err, result, fields) {
		if (err) throw err;
		res.send(result);
	});
});

router.post('/', auth.optional, function (req, res, next) { 
	const body = req.body
	
	const name = body.name
	const address = body.address
	const phone = body.phone
	
	con.query("INSERT into venues (name, address, phone_num) VALUES (?, ?, ?)", [name, address, phone], function (err, result, fields) {
		if (err) throw err;
		res.send(result);
	});
});

module.exports = router;
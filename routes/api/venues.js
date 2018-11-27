const router = require('express').Router();
const auth = require('../auth');
const mysql = require('mysql');

createRoutes = function(conn) {
	router.get('/', auth.optional, function (req, res, next) { 
		const venueId = req.params.id;

		conn.query("SELECT id, name FROM venues", function (err, result, fields) {
			if (err) throw err;
			res.send(result);
		});
	});

	router.get('/:id', auth.optional, function (req, res, next) { 
		const venueId = req.params.id;

		conn.query("SELECT name, address, phone_num FROM venues where id = ?", [venueId], function (err, result, fields) {
			if (err) throw err;
			res.send(result);
		});
	});

	router.post('/', auth.required, function (req, res, next) { 
		const body = req.body
		
		const name = body.name
		const address = body.address
		const phone = body.phone
		
		conn.query("INSERT into venues (name, address, phone_num) VALUES (?, ?, ?)", [name, address, phone], function (err, result, fields) {
			if (err) throw err;
			res.send(result);
		});
	});
}

module.exports = function(conn) {
	createRoutes(conn)
	
	return router;	
}
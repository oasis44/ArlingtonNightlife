const express = require('express');
const router = express.Router();

const setup = function(conn) {
	router.use('/users', require('./users'));
	router.use('/events', require('./events')(conn));
	router.use('/venues', require('./venues')(conn));
}

module.exports = function(conn) {
	setup(conn);
	
	return router;	
}
const express = require('express');
const router = express.Router();

const setup = function(conn) {
	router.use('/api', require('./api')(conn));
}

module.exports = function(conn) {
	setup(conn);
	
	return router;	
}
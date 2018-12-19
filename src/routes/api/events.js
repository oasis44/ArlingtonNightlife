const router = require('express').Router();
const auth = require('../auth');
const mysql = require('mysql');

const createRoutes = function(conn) {
	router.get('/', auth.optional, (req, res, next) => {
		const eventType = req.query.eventType;
		
		const mainQuery = "SELECT venues.id as venue_id, name as venue_name, DATE_FORMAT(start_time, '%l:%i %p') as start_time, DATE_FORMAT(end_time, '%l:%i %p') as end_time, events.type as event_type FROM events, venues WHERE venues.id = events.venue_id"
		var queryStr = ""
		
		if (eventType === 'All Events') {
			queryStr = mainQuery
			params = []
		} else {
			queryStr = mainQuery + " AND type = ?"
			params = [eventType]
		}

		conn.query(queryStr, params, function (err, result, fields) {
			if (err) throw err;
			res.send(result);
		});
	});

	router.post('/', auth.required, function (req, res, next) { 
		const body = req.body
		
		const eventType = body.eventType
		const venueId = body.venue
		const startTime = body.startTime
		const endTime = body.endTime
		
		conn.query("INSERT into events (type, start_time, end_time, venue_id) VALUES (?, STR_TO_DATE(?, '%M %e, %Y %T'), STR_TO_DATE(?, '%M %e, %Y %T'), ?)", [eventType, startTime, endTime, venueId], function (err, result, fields) {
			if (err) throw err;
			res.send(result);
		});
	});
}

module.exports = function(conn) {
	createRoutes(conn)
	
	return router;	
}
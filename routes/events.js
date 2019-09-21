var express = require('express');
var router = express.Router();
var eventController = require('../controllers/events');

// Routes related to event
router.post('/', eventController.addEvent);
router.get('/', eventController.getAllEvents);
router.get('/actors/:actorId', eventController.getByActor);

module.exports = router;
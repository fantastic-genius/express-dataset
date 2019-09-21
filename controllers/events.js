const db = require('../db/models');

var getAllEvents = async (req, res) => {
	const events = await db.Events.findAll({
		order: ['id']
	});

	return res.status(200).json(events);
};

var addEvent = async (req, res) => {
	const eventData = req.body
	const { id } = eventData;

	const event = await db.Events.findOne({
		where: { id }
	});

	if(event){
		return res.status(400).json({
			error: 'Event already existed'
		});
	}

	const newEvent = await db.Events.create(eventData);

	return res.status(201).json(newEvent);
};


var getByActor = async (req, res) => {
	const { actorId } = req.params;
	const events = await db.Events.findAll({
		where:{
			"actor.id": parseInt(actorId)
		},
		order: ['id']
	});

	if(!events.length){
		return res.status(400).json({
			error: 'Events not found'
		})
	}

	return res.status(200).json(events)
};


var eraseEvents = async (req, res) => {
	db.Events.destroy({
		where: {},
		truncate: true
	});

	return res.status(200).send({
		message: 'You have successfully erased all events'
	});
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};


















const db = require('../db/models');
const moment = require('moment');
moment().format();

var getAllActors = async (req, res) => {
	const actorEventsArr = await getActorsEvents();
	actorEventsArr.sort((a, b) => (a.events.length < b.events.length ? 1 : -1))
	const actor = actorEventsArr.map(actorEvents => actorEvents.events[0].actor)

	return res.status(200).json(actor);
};

var updateActor = async (req, res) => {
	const { id, login } = req.body

	const events = await db.Events.findAll({
		where: {
			"actor.id": parseInt(id),
			"actor.login": login
		}
	})

	if(!events.length){
		return res.status(404).json({
			error: 'Actor does not exist'
		});
	}

	await db.Events.update(
		{
			actor: req.body
		},
		{
			where: {
				"actor.id": parseInt(id),
				"actor.login": login
			}
		}
	);

	return res.status(200).json({
		message: 'Avatar update was successful'
	});

};

var getStreak = async (req, res) => {
	const actorsEventArr = await getActorsEvents();

	let actorsData = [];

	actorsEventArr.map(actorEvent => {
		const { eventsDate } = actorEvent;
		let currentStreakCount = 0;
		let highestStreak = 0;
		eventsDate.map((date, index) => {
			const daysDiff = moment(date).diff(moment(eventsDate[index-1]), 'days');

			if(daysDiff === 1){
				currentStreakCount += 1;
				if(currentStreakCount > highestStreak){
					highestStreak = currentStreakCount;
				}
			}else if(daysDiff > 1){
				currentStreakCount = 0;
			}
		});
		const maxDateCount = highestStreak;
		actorsData.push({
			...actorEvent,
			maxDateCount
		});
	});

	actorsData.sort((a, b) => {
		if(a.maxDateCount < b.maxDateCount){
			return 1;
		}else{
			return -1;
		}
	});


	const actors = actorsData.map(data => {
		return data.events[0].actor
	})
	
	return res.status(200).json(actors)
};

const getActorsEvents = async () => {
	const events = await db.Events.findAll({
		order: [
			['created_at', 'DESC'],
			['actor.login']
		]
	});

	const actorsId = [...new Set(events.map(event => event.actor.id))];

	const actorsEventArr = []

	actorsId.map(actorId => {
		let actorEvents = [];
		let eventsDate = [];
		events.filter(event => {
			if(event.actor.id === actorId){
				actorEvents.push(event);
				const eventDate = new Date(event.created_at);
				const formatteddate = moment(eventDate).format('YYYY-MM-DD');
				eventsDate.push(formatteddate);
			}
		});
		eventsDate.sort();
		actorsEventArr.push({
			actorId,
			events: actorEvents,
			eventsDate
		})
	});

	return actorsEventArr;
}


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};


















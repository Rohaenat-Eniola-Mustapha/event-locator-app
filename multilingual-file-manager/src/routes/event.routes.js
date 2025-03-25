const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, eventController.createEvent);
router.get('/', eventController.getEvents);
router.put('/:id', authMiddleware, eventController.updateEvent);
router.delete('/:id', authMiddleware, eventController.deleteEvent);
router.get('/near', eventController.findEventsNear);
router.get('/filter', eventController.filterEventsByCategory);

module.exports = router;
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const restaurantsRouter = require('./restaurants.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/restaurants', restaurantsRouter);

module.exports = router;

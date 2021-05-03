const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const restaurantsRouter = require('./restaurants.js');
const ratingsRouter = require('./ratings.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/restaurants', restaurantsRouter);

router.use('/ratings', ratingsRouter)

module.exports = router;

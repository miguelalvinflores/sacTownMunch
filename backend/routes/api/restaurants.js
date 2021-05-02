const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Restaurant } = require('../../db/models');
const { Rating } = require('../../db/models/');
const {validateRating} = require('../validations/rating');
const {validateRestaurant} = require('../validations/restaraurant');
const router = express.Router();

router.post('/', validateRestaurant,
  asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.create(req.body);

    return res.redirect(`${req.baseUrl}/${restaurant.id}`);
  }))

router.get('/', asyncHandler(async function(_req, res) {
  const restaurants = await Restaurant.getTenMostRecent();
  // console.log("GET api/restaurant", restaurants)
  return res.json(restaurants);
}))

// get restaurants
router.get('/:id', asyncHandler(async function(req, res) {
  const restaurant = await Restaurant.getCurrentRestaurant(req.params.id);
  return res.json(restaurant);
}))

//get ratings with specified restaurant id
router.get('/:id/ratings', asyncHandler(async function(req, res) {
  const ratings = await Rating.ratingsByRestaurantId(req.params.id);
  return res.json(ratings);
}));

// const validateRating = [
//   check('comment')
//     .exists({checkFalsy: true })
//     .isLength({min: 3 })
//     .withMessage('Plese provide a brief comment about why you decided to give your rating'),
//   check('rating')
//     .exists({checkFalsy: true })
//     .isInt({min:0, max: 5})
//     .withMessage('Plese provide a numeric rating from 0-5, where 0 is unlike to recommend and 5 is likely to recommend'),
//   check('date')
//     .exists({checkFalsy: true })
//     .withMessage('Your browser did not provide a date'),
//   handleValidationErrors,
// ]

router.post('/:id/ratings', validateRating,
  asyncHandler( async (req, res) => {
    const rating = await Rating.addRating(req.body,req.params.id);
    return res.json(rating);
  }
));


module.exports = router;

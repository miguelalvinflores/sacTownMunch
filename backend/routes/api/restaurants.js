const express = require('express');
const asyncHandler = require('express-async-handler');

const { Restaurant } = require('../../db/models');
const { Rating } = require('../../db/models/');
const {validateRating} = require('../validations/rating');
const {validateRestaurant, validateRestaurantUpdate} = require('../validations/restaraurant');
const router = express.Router();

router.post('/', validateRestaurant,
  asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.create(req.body);

    return res.redirect(`${req.baseUrl}/${restaurant.id}`);
  })
);

router.get('/', asyncHandler(async function(_req, res) {
  const restaurants = await Restaurant.getTenMostRecent();
  // console.log("GET api/restaurant", restaurants)
  return res.json(restaurants);
}));

router.put('/:id',validateRestaurantUpdate,
  asyncHandler(async function (req, res) {
    const id = await Restaurant.update(req.body);
    const restaurant = await Restaurant.findByPk(id);
    return res.json(restaurant);
  })
);

// get restaurants
router.get('/:id', asyncHandler(async function(req, res) {
  const restaurant = await Restaurant.getCurrentRestaurant(req.params.id);
  return res.json(restaurant);
}))

//get ratings with specified restaurant id
router.get('/:id/ratings', asyncHandler(async function(req, res) {
  const ratings = await Rating.ratingsByRestaurantId(req.params.id);
  console.log('rating at api handler', ratings);
  return res.json(ratings);
}));


router.post('/:id/ratings', validateRating,
  asyncHandler( async (req, res) => {
    const rating = await Rating.addRating(req.body,req.params.id);
    return res.json(rating);
  }
));


module.exports = router;

const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Restaurant } = require('../../db/models');
const { Rating } = require('../../db/models/rating');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateNewRestaurant = [
  check('restaurant_name')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 , max: 60})
    .withMessage('Please provide a valid restaurant name that is between 3 and 60 characters in length'),
  check('address')
    .exists({ checkFalsy: true})
    .isLength({ min: 4, max: 200})
    .withMessage('Please provide an adress for your restaurant'),
  check('photo_url')
    .exists({ checkFalsy: true})
    .withMessage('Please provide a valid photo_url, preferably 1280x720'),
  check('summary')
    .exists({ checkFalsy: true})
    .isLength({min: 4, max: 200})
    .withMessage('Please provide a short summary that encompasses the theme of your restaurant (Most summaries are 2-4 words in length)'),
  check('full_description')
    .exists({ checkFalsy: true })
    .isLength({ min: 60})
    .withMessage('Please provide a full description of your restaurant'),
  handleValidationErrors,
  ];

router.post('/', validateNewRestaurant,
  asyncHandler(async (req, res) => {
    const {
      restaurant_name,
      address,
      photo_url,
      summary,
      full_description
    } = req.body;
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


module.exports = router;

const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Restaurant } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async function(_req, res) {
  const restaurants = await Restaurant.getTenMostRecent();
  console.log("GET api/restaurant", restaurants)
  return res.json(restaurants);
}))

const validateNewRestaurant = [
  check
];

module.exports = router;

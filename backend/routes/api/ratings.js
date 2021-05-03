const express = require('express');
const asyncHandler = require('express-async-handler');

const { Rating } = require('../../db/models');
const { validateUpdate } = require('../validations/rating');

const router = express.Router();

router.put('./:id', validateUpdate,
  asyncHandler(async function(req,res) {
    const rating = await Rating.updateRating(req.body);
    return res.json(rating);
  })
);

router.delete('/:id'), asyncHandler(async function (req, res) {
  const ratingId = await Rating.deleteRating(req.params.id);
  return res.json({ratingId});
});

module.exports = router;

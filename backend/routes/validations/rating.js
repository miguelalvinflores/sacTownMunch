const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateRating = [
  check('comment')
    .exists({checkFalsy: true })
    .isLength({min: 3 })
    .withMessage('Plese provide a brief comment about why you decided to give your rating'),
  check('rating')
    .exists({checkFalsy: true })
    .isInt({min:0, max: 5})
    .withMessage('Plese provide a numeric rating from 0-5, where 0 is unlike to recommend and 5 is likely to recommend'),
  check('date')
    .exists({checkFalsy: true })
    .withMessage('Your browser did not provide a date'),
  handleValidationErrors,
];

module.exports = {
  validateRating,
}

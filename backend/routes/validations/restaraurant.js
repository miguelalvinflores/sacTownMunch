const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateRestaurant = [
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
const validateRestaurantUpdate = [
  check('id')
    .notEmpty()
    .isInt({ min: 0 }),
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
]

module.exports = {
  validateRestaurant,
  validateRestaurantUpdate,
}

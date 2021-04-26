'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    comment: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    restaurant_id: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  Rating.associate = function(models) {
    // associations can be defined here
  };
  return Rating;
};
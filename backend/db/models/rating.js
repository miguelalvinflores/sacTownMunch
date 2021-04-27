'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Users'},
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Restaurants'},
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: Date.now(),
      }
    },
  }, {});
  Rating.associate = function(models) {
    Rating.belongsTo(models.User, {foreignKey: 'user_:id'})
    Rating.belongsTo(models.Restaurant, {foreignKey: 'restaurant_id'})
  };
  return Rating;
};

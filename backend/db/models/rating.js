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
      }
    },
  }, {});
  Rating.associate = function(models) {
    Rating.belongsTo(models.User, {foreignKey: 'user_:id'})
    Rating.belongsTo(models.Restaurant, {foreignKey: 'restaurant_id'})
  };
  Rating.ratingsByRestaurantId = async function(restaurant_id) {
    return await Restaurant.findAll({
      where: {
        restaurant_id,
      },
    });
  };

  Rating.addRating = async function(details, restaurant_id) {
    const rating = await Rating.create({
      ...details,
      restaurant_id,
    });

    return await Rating.findByPk(rating.id);
  };

  Rating.updateRating = async function(details) {
    const id = details.id;
    delete details.id;

    await Rating.update(
      details,
      {
        where: {id},
        returning: true,
        plain: true,
      }
    );
    return await Rating.findByPk(id);
  };

  Rating.deleteRating(ratingId) {
    const rating = await Rating.findByPk(ratingId);
    if (!item) throw new Error('Cannot find Rating');

    await Rating.destroy({ where: {id: rating.id}});
    return rating.id;
  };

  return Rating;
};

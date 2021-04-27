'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
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
  }, {});
  Favorite.associate = function(models) {
    Favorite.belongsTo(models.User, {foreignKey: 'user_:id'})
    Favorite.belongsTo(models.Restaurant, {foreignKey: 'restaurant_id'})
  };
  return Favorite;
};

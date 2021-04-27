'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users'
      }
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Restaurants'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: Date.now()+(86400*1000),
      },
    },
    number_of_people: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 8,
      },
    },
  }, {});
  Reservation.associate = function(models) {
    Reservation.belongsTo(models.User, {foreignKey: 'user_id'})
    Reservation.belongsTo(models.Restaurant, {foreignKey: 'restaurant_id'})
    // associations can be defined here
  };
  return Reservation;
};

'use strict';


module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    restaurant_name: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    full_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: 'Users'
      }
    },
  }, {
    defaultScope: {
      attributes: {
        exclude: ['updatedAt'],
      },
    },
    scopes: {
      currentRestaurant: {
        attributes: {}
      },
    },
  });
  Restaurant.associate = function(models) {
    Restaurant.belongsTo(models.User, { foreignKey: 'owner_id' })
    Restaurant.hasMany(models.Reservation, { foreignKey: 'restaurant_id'})
    Restaurant.hasMany(models.Rating, {foreignKey: 'restaurant_id'})
    Restaurant.hasMany(models.Favorite, {foreignKey: 'restaurant_id'})
  };
  Restaurant.getCurrentRestaurant = async function (id) {
    return await Restaurant.scope('currentRestaurant').findByPk(id);
  };

  Restaurant.getTenMostRecent = async function() {
    return await Restaurant.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']]
    });
  }

  Restaurant.update = async function(details) {
    const id = detils.id;
    delete details.id;
    await Restaurant.update(
      details,
      {
        where: { id },
        returning: true,
        plain: true,
      }
    )
    return id;
  }

  return Restaurant;
};

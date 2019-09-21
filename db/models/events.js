'use strict';
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    type: DataTypes.STRING,
    actor: DataTypes.JSON,
    repo: DataTypes.JSON,
    created_at: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true
  });
  Events.associate = function(models) {
    // associations can be defined here
  };
  return Events;
};
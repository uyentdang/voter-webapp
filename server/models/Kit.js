'use strict';
module.exports = (sequelize, DataTypes) => {
  var Kit = sequelize.define(
    'kit',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      user: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      code: {
        type: DataTypes.TEXT,
        unique: true,
        sparse: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      shipped: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      shippedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {}
  );
  Kit.associate = function(models) {
    Kit.belongsTo(models.User, {as: 'User', foreignKey: 'user'});
    Kit.belongsTo(models.Address, {as: 'ShippingAddress', foreignKey: 'shippingAddress'});
  };
  return Kit;
};


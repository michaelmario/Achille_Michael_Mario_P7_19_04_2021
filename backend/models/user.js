'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post, { onDelete: "CASCADE", hooks: true });
      models.User.hasMany(models.Comment, { onDelete: "CASCADE", hooks: true });
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    departement: DataTypes.STRING,
    password: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    bio: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updateAt: DataTypes.DATE,
    isAdmin: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Post.hasMany(models.Comment, { onDelete: "CASCADE", hooks: true });

      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  };
  Post.init({
    title: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
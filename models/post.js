"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Define associations here
      Post.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Post.init(
    {
      user_id: DataTypes.INTEGER, // You might want to store picture URLs or file paths here
      content: DataTypes.TEXT,
      picture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};

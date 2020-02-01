
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // username: DataTypes.STRING
  });

  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};

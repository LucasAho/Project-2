module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    userId: DataTypes.INTEGER,
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // createdAt: DataTypes.INTEGER
  });

  

  return Post;
};

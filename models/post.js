module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: "TIMESTAMP",
      allowNull: false
    },
    updatedAt: {
      type: "TIMESTAMP",
      allowNull: false
    }
  });

  Post.associate = function(models) {
    Post.belongsTo(models.User, {
        foreignKey: {
            allowNull: false
        }
    });
  }

  return Post;
};


module.exports = function(sequelize, DataTypes) {
  var Chats = sequelize.define("Chats", {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // username: DataTypes.STRING
  });

  Chats.associate = function(models) {
    Chats.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Chats;
};

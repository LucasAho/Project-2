var userSequel = function(sequelize, DataTypes) {
  var User = sequelize.define("users", {
    username: DataTypes.STRING,
    pass: DataTypes.STRING,
    email: DataTypes.STRING,
    actType: DataTypes.BOOLEAN
  });

  // NPC.associate = function(models) {
  //   NPC.hasMany(models.post, {
  //     onDelete: "cascade"
  //   });
  // };
  return User;
};

module.exports = userSequel;

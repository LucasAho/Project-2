module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    pass: DataTypes.STRING,
    email: DataTypes.STRING,
    actType: DataTypes.BOOLEAN
  });

  // User.associate = function(models) {
  //   User.hasMany(models.char, {
  //     onDelete: "cascade"
  //   });
  // };
  return User;
};

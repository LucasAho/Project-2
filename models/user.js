module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    pass: DataTypes.STRING,
    email: DataTypes.STRING,
    actType: DataTypes.BOOLEAN
  });

 
  return User;
};

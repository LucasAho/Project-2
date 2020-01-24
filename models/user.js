module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  user.associate = function(models){
    user.hasMany(models.post,{
      onDelete:"cascade"
    });
  };
  return user;
};

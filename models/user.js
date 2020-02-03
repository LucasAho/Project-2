var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    username: {
     type: DataTypes.STRING,
     allowNull: false
    },
    pass: DataTypes.STRING,
    email: DataTypes.STRING,
    actType: DataTypes.BOOLEAN
  });
  User.associate = function(models) {
    User.hasMany(models.Char, {
      onDelete: "cascade"
    });
    User.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  User.generateHash = function(pass) {
    return bcrypt.hashSync(pass, bycrpt.genSaltSync(8), null);
  };

  User.prototype.validPassword = function(pass) {
    console.log(pass, this.localPassword);
    return bcrypt.compareSync(pass, this.localPassword);
  }

  return User;
};

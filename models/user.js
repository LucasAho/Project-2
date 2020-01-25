module.exports = function(sequelize, DataTypes) {
  var NPC = sequelize.define("npcs", {
    fullname: DataTypes.STRING,
    race: DataTypes.STRING,
    eye_color: DataTypes.STRING,
    hair_color: DataTypes.STRING,
    build: DataTypes.STRING,
    age: DataTypes.INTEGER,
    personality: DataTypes.STRING,
    profession: DataTypes.STRING,
    meta: DataTypes.BOOLEAN
  });

  // NPC.associate = function(models) {
  //   NPC.hasMany(models.post, {
  //     onDelete: "cascade"
  //   });
  // };
  return NPC;
};

module.exports = function(sequelize, DataTypes) {
  var NPC = sequelize.define('NPC', {
    fullname: DataTypes.STRING,
    race: DataTypes.STRING,
    descript: DataTypes.STRING,
    personality: DataTypes.STRING,
    profession: DataTypes.STRING
  });
  // NPC.associate = function(models) {
  //   NPC.hasMany(models.post, {
  //     onDelete: "cascade"
  //   });
  // };
  return NPC;
};

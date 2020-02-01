module.exports = function (sequelize, DataTypes) {
    var Local = sequelize.define("Local", {
        title: DataTypes.STRING,
        notes: DataTypes.STRING,
        parentLocal: DataTypes.STRING       
    });
    return Local;
}

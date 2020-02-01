module.exports = function (sequelize, DataTypes) {
    var Locale = sequelize.define("Locale", {
        title: DataTypes.STRING,
        notes: DataTypes.STRING,
        parentLocale: DataTypes.STRING       
    });
    return Locale;
}

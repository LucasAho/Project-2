module.exports = function(sequelize, DataTypes) {
    var Char = sequelize.define("Char", {
        user_id: DataTypes.INTEGER,
        charName: DataTypes.STRING,
        class: DataTypes.STRING,
        lvl: DataTypes.INTEGER,
        race: DataTypes.STRING,
        align: DataTypes.STRING,
        experience: DataTypes.INTEGER,
        profBonus: DataTypes.INTEGER,
        AC: DataTypes.INTEGER,
        speed: DataTypes.INTEGER,
        maxHd: DataTypes.INTEGER,
        strength: DataTypes.INTEGER,
        dex: DataTypes.INTEGER,
        constitution: DataTypes.INTEGER,
        intelligence: DataTypes.INTEGER,
        wisdom: DataTypes.INTEGER,
        charisma: DataTypes.INTEGER,
        inventory: DataTypes.STRING,
        notes: DataTypes.STRING
    });

    return Char;
}
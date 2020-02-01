module.exports = function (sequelize, DataTypes) {
    var Char = sequelize.define("Char", {
        charName: DataTypes.STRING,
        class: DataTypes.STRING,
        lvl: DataTypes.INTEGER,
        race: DataTypes.STRING,
        align: DataTypes.STRING,
        experience: DataTypes.INTEGER,
        profBonus: DataTypes.INTEGER,
        AC: DataTypes.INTEGER,
        initBonus: DataTypes.INTEGER,
        speed: DataTypes.INTEGER,
        currentHP: DataTypes.INTEGER,
        maxHp: DataTypes.INTEGER,
        strength: DataTypes.INTEGER,
        dex: DataTypes.INTEGER,
        constitution: DataTypes.INTEGER,
        intelligence: DataTypes.INTEGER,
        wisdom: DataTypes.INTEGER,
        charisma: DataTypes.INTEGER,
        inventory: DataTypes.STRING,
        notes: DataTypes.STRING
    });

    // Char.associate = function(models) {
    //     Char.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // }


    return Char;
}
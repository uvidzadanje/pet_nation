const {DataTypes} = require("sequelize");
const db = require("../db");

const Potrosac = db.define("Potrosac", {
    ime: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    prezime: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    broj_telefona: {
        type: DataTypes.STRING(13),
        allowNull: false
    }
});

module.exports = Potrosac;
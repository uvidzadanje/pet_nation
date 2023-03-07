const {DataTypes} = require("sequelize");
const db = require("../db");

const Korpa = db.define("Korpa", {
    adresa_isporuke: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    poslato_kuriru: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
})

module.exports = Korpa;
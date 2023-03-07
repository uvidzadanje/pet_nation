const {DataTypes} = require("sequelize");
const db = require("../db");

const OcenaStavka = db.define("OcenaStavka", {
    ocena: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    }
})

module.exports = OcenaStavka;
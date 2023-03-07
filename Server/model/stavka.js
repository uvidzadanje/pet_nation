const {DataTypes} = require("sequelize");
const db = require("../db");

const Stavka = db.define("Stavka", {
    naziv: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    opis: {
        type: DataTypes.TEXT
    }
});

module.exports = Stavka;
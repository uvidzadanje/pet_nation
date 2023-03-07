const {DataTypes} = require("sequelize");
const db = require("../db");

const Kategorija = db.define("Kategorija", {
    naziv: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});

module.exports = Kategorija;
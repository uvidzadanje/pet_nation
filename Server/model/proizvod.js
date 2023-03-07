const {DataTypes} = require("sequelize");
const db = require("../db");

const Proizvod = db.define("Proizvod", {
    cena: {
        type: DataTypes.DOUBLE,
        allowNull: false   
    },
    naziv_proizvodjaca: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    zemlja_porekla: {
        type: DataTypes.STRING(25),
        allowNull: false,
    }
})

module.exports = Proizvod;
const {DataTypes} = require("sequelize");
const db = require("../db");

const Preduzece = db.define("Preduzece", {
    naziv: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lokacija: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    opis: {
        type: DataTypes.TEXT
    },
    profilna_slika_link: {
        type: DataTypes.STRING(100),
    }
})

module.exports = Preduzece;
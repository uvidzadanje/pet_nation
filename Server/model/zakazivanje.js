const {DataTypes} = require("sequelize");
const db = require("../db");

const Zakazivanje = db.define("Zakazivanje", {
    datum_zakazivanja: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    broj_sati: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

module.exports = Zakazivanje;
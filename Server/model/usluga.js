const {DataTypes} = require("sequelize");
const db = require("../db");

const Usluga = db.define("Usluga", {
    cena_po_satu: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
});

module.exports = Usluga;
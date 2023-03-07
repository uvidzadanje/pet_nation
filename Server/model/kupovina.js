const {DataTypes} = require("sequelize");
const db = require("../db");

const Kupovina = db.define("Kupovina", {
    kolicina: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Kupovina;
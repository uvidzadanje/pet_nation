const {DataTypes} = require("sequelize");
const db = require("../db");

const OcenaPreduzece = db.define("OcenaPreduzece", {
    ocena: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
})

module.exports = OcenaPreduzece;
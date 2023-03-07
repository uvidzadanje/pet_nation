const {DataTypes} = require("sequelize");
const db = require("../db");

const StavkaSlika = db.define("StavkaSlika", {
    slika_link: {
        type: DataTypes.STRING(100)
    }
})

module.exports = StavkaSlika;
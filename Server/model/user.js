const {DataTypes} = require("sequelize");
const db = require("../db");

const User = db.define("User", {
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        //encrypted value
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    type: {
        //encrypted value
        type: DataTypes.STRING(100),
        allowNull: false
    }
})

module.exports = User;
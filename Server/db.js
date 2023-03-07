const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();

class Database extends Sequelize {
    constructor()
    {
        super(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            logging: false,
        });
    }

    async checkDatabase() {
        try {
            await this.authenticate();
            console.log(`Connected to ${this.config.database} database at port ${this.config.port}...`);
        } catch (error) {
            console.log("Could not run db");
        }
    }
}

module.exports = new Database();
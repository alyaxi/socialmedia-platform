require("dotenv").config();
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: 5432,
        dialect: 'postgres',
        dialectOptions: {
        //     connectTimeout: 60000, // 1 minute
        ssl: {
            require: true, // This will help you. But you will see nwe error
            rejectUnauthorized: false // This line will fix new error
          }
        },
    }
);
// sequelize.sync()
module.exports = sequelize;
const config = require("../config/config");
// const mysql = require('mysql2/promise');
// const {Op} = require("sequelize");
const Sequelize = require("sequelize");


const db = {}
// mysql.createConnection({
//   user     : config.USER,
//   password : config.PASSWORD
// }).then((connection) => {
//   connection.query('CREATE DATABASE IF NOT EXISTS bakereedev;').then(() => {
//       // Safe to use sequelize now
      
//   })
// })

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    dialectOptions: {
      //     connectTimeout: 60000, // 1 minute
      ssl: {
          require: true, // This will help you. But you will see nwe error
          rejectUnauthorized: false // This line will fix new error
        }
      },   // operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);




db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.js")(sequelize, Sequelize);


module.exports = db
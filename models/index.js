const config = require("../config/config");
const Sequelize = require("sequelize");

const db = {};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  dialectOptions: {
    //     connectTimeout: 60000, // 1 minute
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false, // This line will fix new error
    },
  }, // operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const models = {
  User: require("./user")(sequelize, Sequelize),
  Post: require("./post")(sequelize, Sequelize),
  // Other models...
};

Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

  
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = models.User;
db.post = models.Post;

module.exports = db;

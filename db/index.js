const pg = require("pg");
const { Pool } = pg;

let LocalPoolConfig = {
  user: "postgres", //env var: PGUSER
  password: "linq$123", //env var: PGPASSWORD
  host: "linq-db-instance.crpqlrmzdwq1.us-west-1.rds.amazonaws.com", //env var: PGHOST, if not specified localhost is used
  port: "5432",
  database: "linqinitial",
  ssl: true,
};

const poolConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL, ssl: { rejectUnauth: false } }
  : LocalPoolConfig;

const pool = new Pool(poolConfig);

module.exports = pool;

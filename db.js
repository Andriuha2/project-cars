const { Pool } = require("pg");

const connectionString =
  "postgres://clzuyzgq:38vzSB9GuziPIzhRJE2b1Adv6DVnMGDw@mouse.db.elephantsql.com/clzuyzgq";

const pool = new Pool({
  connectionString,
});

module.exports = pool;

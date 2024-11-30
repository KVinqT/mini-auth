import { Pool } from "pg";

const pg = new Pool({
  max: 20,
  user: "postgres",
  host: "localhost",
  database: "kvin-app",
  password: process.env.POSTGRES_USER_PASSWORD,
  port: 5433,
  idleTimeoutMillis: 1000, // the time that allow to be unused by client before pg close the database connection
});

export default pg;

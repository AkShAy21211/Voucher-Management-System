import mysql from "mysql2";
import CONFIG from "./index.js";


const pool = mysql
  .createPool({
    host: CONFIG.DB_HOST,
    user: CONFIG.DB_USER,
    port:CONFIG.PORT,
    password: CONFIG.DB_PASSWORD,
    database: CONFIG.DB_NAME,
  })
  .promise();



export default pool;

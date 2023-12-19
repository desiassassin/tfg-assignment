import { createConnection } from "mysql2/promise";

let SQL_DATABASE = null;

export default async function connectMYSQL() {
     try {
          SQL_DATABASE = await createConnection({ host: process.env.MYSQL_DB_URL_HOST, user: process.env.MYSQL_DB_URL_USER, database: process.env.MYSQL_DB_URL_DATABASE_NAME, password: process.env.MYSQL_DB_URL_PASSWORD });
          console.log("Connected to MYSQL Database.");
     } catch (error) {
          console.log("Unable to connect to MYSQL database.", error);
          process.exit();
     }
}

export { SQL_DATABASE };

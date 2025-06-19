import mysql from "mysql2/promise";
import config from "./config";

async function query(sql: string, params: any): Promise<any> {
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.query<any>(sql, params);
  await connection.end();
  return results;
}

export default {
  query,
};

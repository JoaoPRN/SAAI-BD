import dotenv from "dotenv";
dotenv.config();

const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true,
  },
  port: process.env.PORT,
  listPerPage: process.env.LIST_PER_PAGE,
};
export default config;

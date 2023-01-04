import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const connectionDB = new Pool({
	host: 'localhost',
	port: 5432,
	user: 'postgres',
	password: 'postgres',
	database: 'linkr',
  });

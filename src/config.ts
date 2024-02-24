// config.ts
import * as dotenv from 'dotenv';
const environment = process.env.NODE_ENV || 'production';
dotenv.config({ path: `./.env.${environment}` });

const PORT = process.env.PORT || 80;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/mydatabase';
const SECRET_KEY = process.env.SECRET_KEY || 'mysecretkey';
const AWS_ACCESS_KEY_ID=process.env.ACCESS_KEY || 'AKIAXG7ITWKGBUQQ3YAC';
const AWS_SECRET_ACCESS_KEY=process.env.SECRET_KEY || '';
const AWS_REGION=process.env.AWS_REGION || 'us-east-1';
export default {
  PORT,
  DB_CONNECTION_STRING,
  SECRET_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION
};

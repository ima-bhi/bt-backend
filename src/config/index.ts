import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file");
}

export default {
  env: process.env.NODE_ENV || "dev",
  bt: {
    databaseURL: process.env.USERS_MONGODB_URI,
    port: process.env.USERS_MICROSERVICE_PORT,
    host: process.env.USERS_MICROSERVICE_HOST,
    pathPrefix: process.env.USERS_MICROSERVICE_PATHPREFIX,
  },
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  },
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  agendash: {
    user: "agendash",
    password: "123456",
  },
  api: {
    prefix: "/api",
  },
};

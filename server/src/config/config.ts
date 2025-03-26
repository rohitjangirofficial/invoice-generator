import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const config = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  frontendURL: process.env.FRONTEND_URL,
};

export default Object.freeze(config);

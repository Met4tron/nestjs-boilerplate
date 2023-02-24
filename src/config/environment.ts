import { cleanEnv, port, str } from 'envalid';

const env = cleanEnv(process.env, {
  PORT: port(),
  ACCESS_TOKEN_SECRET: str(),
  ACCESS_TOKEN_EXPIRES: str(),
  REFRESH_TOKEN_SECRET: str(),
  REFRESH_TOKEN_EXPIRES: str(),
});

export const apiConfig = {
  PORT: env.PORT,
};

export const jwtConfig = {
  refreshOptions: {
    secret: env.REFRESH_TOKEN_SECRET,
    expiresIn: env.REFRESH_TOKEN_EXPIRES,
  },
  accessOptions: {
    secret: env.ACCESS_TOKEN_SECRET,
    expiresIn: env.ACCESS_TOKEN_EXPIRES,
  },
};

export const isDevelopment = env.isDevelopment;
export const isProduction = env.isProduction;
export const isTest = env.isTest;

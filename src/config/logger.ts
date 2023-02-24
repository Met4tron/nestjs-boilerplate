import { Params, PinoLogger } from 'nestjs-pino';
import { isDevelopment, isTest } from './environment';

export const loggerConfig: Params = {
  pinoHttp: {
    enabled: !isTest,
    base: null,
    messageKey: 'message',
    transport: isDevelopment
      ? {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
            colorize: true,
          },
        }
      : null
  },
};

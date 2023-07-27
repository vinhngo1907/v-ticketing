import pinoHttpLogger, { HttpLogger as PinoHttpLogger } from 'pino-http';

export type HttpLogger = PinoHttpLogger;
export const httpLogger = (): HttpLogger => pinoHttpLogger();

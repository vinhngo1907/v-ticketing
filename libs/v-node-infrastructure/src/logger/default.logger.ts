import logger, { Logger } from 'pino';

export type DefaultLogger = Logger;

export const defaultLogger = (): DefaultLogger => logger();

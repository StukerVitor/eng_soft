import { format, transports, createLogger } from 'winston';
import type { TransformableInfo } from 'logform';

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf((info: TransformableInfo) => {
      return `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`;
    })
  ),
  transports: [new transports.Console()]
});

export default logger;

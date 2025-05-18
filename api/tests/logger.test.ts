
import logger from '../src/utils/logger';

describe('Logger', () => {
  it('log messages without throwing', () => {
    expect(() => {
      logger.info('Coverage ping');
      logger.warn('warn');
      logger.error('error');
    }).not.toThrow();
  });
});

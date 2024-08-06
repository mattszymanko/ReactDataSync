// /src/utils/logger.ts

import config from '../../apiConfig';

enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

class Logger {
  private logLevel: LogLevel;

  constructor() {
    this.logLevel = config.LOG_LEVEL as LogLevel;
  }

  // Dynamic Logger Configuration
  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = Object.values(LogLevel);
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const requiredLevelIndex = levels.indexOf(level);
    return currentLevelIndex <= requiredLevelIndex;
  }

  debug(message: string): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(`[DEBUG] ${message}`);
    }
  }

  info(message: string): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(`[INFO] ${message}`);
    }
  }

  warn(message: string): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(`[WARN] ${message}`);
    }
  }

  error(message: string): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(`[ERROR] ${message}`);
    }
  }
}

const logger = new Logger();

export default logger;

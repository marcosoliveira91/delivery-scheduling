import pino, { Logger as PinoLogger } from 'pino';
import ILogger from './logger.interface';
import * as messages from './messages';

class Logger implements ILogger{
  private static instance: Logger;
  private readonly fileLogger: PinoLogger;
  private readonly consoleLogger: PinoLogger;
  private readonly formatters = {
    bindings (bindings: any): object {
      return { hostname: bindings.hostname };
    },
    level (label: string): object {
      return { level: label };
    },
  }

  private constructor() {
    this.fileLogger = pino({
      timestamp: pino.stdTimeFunctions.isoTime,
      level: 'debug',
      formatters: this.formatters,
    }, pino.destination('./logs/combined.log')
    );
    this.consoleLogger = pino({
      timestamp: pino.stdTimeFunctions.isoTime,
      level: 'debug',
      prettyPrint: { colorize: true },
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }

    return Logger.instance;
  }

  public debug<T>({ message, data }: messages.InfoMessage<T>): void {
    const log = {
      message,
      data,
    };

    this.fileLogger.debug(log);
    this.consoleLogger.debug(log);
  }

  public info<T>({ message, data }: messages.InfoMessage<T>): void {
    const log = {
      message,
      data,
    };

    this.fileLogger.info(log);
    this.consoleLogger.info(log);
  }

  public warn<T>({ message, data }: messages.InfoMessage<T>): void {
    const log = {
      message,
      data,
    };

    this.fileLogger.warn(log);
    this.consoleLogger.warn(log);
  }

  public error<T>({ message, data, error}: messages.ErrorMessage<T>): void {
    const log = {
      message,
      data,
      error: {
        message: error.message,
        stack: error.stack,
      },
    };

    this.fileLogger.error(log);
    this.consoleLogger.error(log);
  }
}

export default Logger;

import convict from 'convict';
import { IConfig } from './config.interface';

const config = convict<IConfig>({
  env: {
    arg: 'env',
    default: 'development',
    doc: 'Application environment',
    env: 'NODE_ENV',
    format: ['development', 'test', 'production'],
  },
  port: {
    arg: 'port',
    default: 3001,
    doc: 'Port to bind',
    env: 'PORT',
    format: 'port',
  },
  cors: {
    originRegex: {
      default: '(localhost:3001)$',
      env: 'CORS_ORIGIN_REGEX',
    },
    credentials: {
      default: true,
    },
  },
  db: {
    connection: {
      host: {
        default: 'timeslots.jnyag.mongodb.net',
        env: 'DB_HOST',
      },
      user: {
        default: 'root',
        env: 'DB_USER',
      },
      password: {
        default: 'test',
        env: 'DB_PASSWORD',
      },
      database: {
        default: 'timeslots',
        env: 'DB_NAME',
      },
    },
  },
  businessRules: {
    teamCapacity: {
      default: 2,
      env: 'BUSINESS_DEFAULT_TEAM_CAPACITY',
    },
    slotDurationInMin: {
      default: 30,
      env: 'BUSINESS_DEFAULT_SLOT_DURATION_MINUTES',
    },
  },
});

config.validate({ allowed: 'strict' });

export default config;

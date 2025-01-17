export interface IConfig {
  env: string;
  port: number;
  cors: {
    originRegex: string;
    credentials: boolean;
  }
  db: {
    connection: {
      host: string;
      user: string;
      srvConnection: boolean;
      password: string;
      database: string;
    }
  },
  businessRules: {
    teamCapacity: number;
    slotDurationInMin: number;
  }
}

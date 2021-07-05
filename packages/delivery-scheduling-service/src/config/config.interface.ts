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
      password: string;
      database: string;
    }
  }
}

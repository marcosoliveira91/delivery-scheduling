export interface IConfig {
  env: string;
  port: number;
  cors: {
    originRegex: string;
    credentials: boolean;
  }
}

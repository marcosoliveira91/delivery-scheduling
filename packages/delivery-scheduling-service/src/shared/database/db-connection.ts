import { IDBConnectionOptions } from './db-connection.interface';
import ILogger from '../logger/logger.interface';
import Logger from '../logger/logger';
import mongoose from 'mongoose';

const dbConnection = async (dbOptions: IDBConnectionOptions): Promise<void> => {
  const logger: ILogger = Logger.getInstance();

  try {
    const path = dbOptions.srvConnection ? 'mongodb+srv' : 'mongodb';
    const uri = `${path}://${dbOptions.user}:${dbOptions.password}@${dbOptions.host}/${dbOptions.database}?retryWrites=true&w=majority`;

    await mongoose.connect(uri,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    logger.error({
      message: 'Error in DB Connection',
      data: {},
      error: error as Error,
    });
  }
};

export default dbConnection;

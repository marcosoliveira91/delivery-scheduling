import { IDBConnectionOptions } from './db-connection.interface';
import ILogger from '../logger/logger.interface';
import Logger from '../logger/logger';
import mongoose from 'mongoose';

const dbConnection = async (dbOptions: IDBConnectionOptions): Promise<void> => {
  const logger: ILogger = Logger.getInstance();

  try {
    // const uri = 'mongodb+srv://root:test@timeslots.jnyag.mongodb.net/timeslots?retryWrites=true&w=majority'; //server
    // const uri = 'mongodb://root:root@0.0.0.0:27017?retryWrites=true&w=majority'; // local
    const uri = `mongodb+srv://root:${dbOptions.password}@${dbOptions.host}/${dbOptions.database}?retryWrites=true&w=majority`;

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

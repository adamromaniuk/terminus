import { Connection as MongooseConnection } from 'mongoose';
import { Connection } from 'typeorm';
export interface DatabasePingCheckSettings {
  connection?: Connection | MongooseConnection;
  timeout?: number;
}

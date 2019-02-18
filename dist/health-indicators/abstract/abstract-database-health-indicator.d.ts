import { Connection as MongooseConnection } from 'mongoose';
import { Connection } from 'typeorm';
import { HealthIndicatorResult } from '../../interfaces';
import { DatabasePingCheckSettings } from '../databse-ping-check-settings.interface';
import { HealthIndicator } from './health-indicator';
export abstract class AbstractDatabaseHealthIndicator extends HealthIndicator {
  protected connection: Connection | MongooseConnection;
  protected constructor(connection: Connection | MongooseConnection);
  protected abstract pingDb(
    connection: Connection | MongooseConnection,
    timeout: number,
  ): Promise<any>;
  pingCheck(
    key: string,
    options?: DatabasePingCheckSettings,
  ): Promise<HealthIndicatorResult>;
}

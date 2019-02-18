import { Connection } from 'mongoose';
import { AbstractDatabaseHealthIndicator } from '../abstract/abstract-database-health-indicator';
export declare class MongooseHealthIndicator extends AbstractDatabaseHealthIndicator {
  readonly connection: Connection;
  constructor(connection: Connection);
  pingDb(connection: Connection, timeout: number): Promise<unknown>;
}

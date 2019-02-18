import { Connection } from 'typeorm';
import { AbstractDatabaseHealthIndicator } from '../abstract/abstract-database-health-indicator';
export declare class DatabaseHealthIndicator extends AbstractDatabaseHealthIndicator {
  readonly connection: Connection;
  constructor(connection: Connection);
  pingDb(connection: Connection, timeout: number): Promise<unknown>;
}

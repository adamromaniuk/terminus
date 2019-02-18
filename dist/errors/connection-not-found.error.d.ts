import { HealthCheckError } from '@godaddy/terminus';
export declare class ConnectionNotFoundError extends HealthCheckError {
  constructor(cause: unknown);
}

import { HealthCheckError } from '@godaddy/terminus';
export declare class TimeoutError extends HealthCheckError {
  constructor(timeout: number, cause: unknown);
}

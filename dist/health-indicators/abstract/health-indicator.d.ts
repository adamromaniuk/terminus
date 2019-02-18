import { HealthIndicatorResult } from '../..';
export abstract class HealthIndicator {
  protected getStatus(
    key: string,
    isHealthy: boolean,
    options?: {
      [key: string]: unknown;
    },
  ): HealthIndicatorResult;
}

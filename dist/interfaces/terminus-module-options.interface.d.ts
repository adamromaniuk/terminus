import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { HealthIndicatorFunction } from './health-indicator.interface';
import { HealthCheckError } from '@godaddy/terminus';
export declare type TerminusLogger = (
  message: any,
  error?: HealthCheckError | Error,
) => any;
export interface TerminusEndpoint {
  url: string;
  healthIndicators: HealthIndicatorFunction[];
}
export interface TerminusModuleOptions {
  endpoints: TerminusEndpoint[];
  logger?: TerminusLogger;
}
export interface TerminusOptionsFactory {
  createTerminusOptions():
    | Promise<TerminusModuleOptions>
    | TerminusModuleOptions;
}
export interface TerminusModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useClass?: Type<TerminusOptionsFactory>;
  useExisting?: Type<TerminusOptionsFactory>;
  useFactory?: (
    ...args: unknown[]
  ) => Promise<TerminusModuleOptions> | TerminusModuleOptions;
  inject?: unknown[];
}

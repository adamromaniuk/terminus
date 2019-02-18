import { OnApplicationBootstrap } from '@nestjs/common';
import { TerminusModuleOptions } from './interfaces';
import { ApplicationReferenceHost } from '@nestjs/core';
import { Terminus, HealthCheckMap } from '@godaddy/terminus';
export declare class TerminusBootstrapService
  implements OnApplicationBootstrap {
  private readonly options;
  private readonly terminus;
  private readonly refHost;
  private httpServer;
  private readonly logger;
  constructor(
    options: TerminusModuleOptions,
    terminus: Terminus,
    refHost: ApplicationReferenceHost,
  );
  private executeHealthIndicators;
  private logError;
  private logHealthCheckRegister;
  private getHealthCheckExecutor;
  getHealthChecksMap(): HealthCheckMap;
  private bootstrapTerminus;
  onApplicationBootstrap(): void;
}

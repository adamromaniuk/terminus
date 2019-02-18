import { HttpService } from '@nestjs/common';
import { HealthIndicatorResult } from '../../interfaces';
import { AxiosRequestConfig } from 'axios';
import { HealthIndicator } from '../abstract/health-indicator';
export declare class DNSHealthIndicator extends HealthIndicator {
  private readonly httpService;
  constructor(httpService: HttpService);
  private pingDNS;
  private generateHttpError;
  pingCheck(
    key: string,
    url: string,
    options?: AxiosRequestConfig,
  ): Promise<HealthIndicatorResult>;
}

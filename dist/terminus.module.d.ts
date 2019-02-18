import { DynamicModule } from '@nestjs/common';
import {
  TerminusModuleOptions,
  TerminusModuleAsyncOptions,
} from './interfaces/terminus-module-options.interface';
export declare class TerminusModule {
  static forRoot(options?: TerminusModuleOptions): DynamicModule;
  static forRootAsync(options: TerminusModuleAsyncOptions): DynamicModule;
}

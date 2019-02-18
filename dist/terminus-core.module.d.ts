import { DynamicModule } from '@nestjs/common';
import {
  TerminusModuleOptions,
  TerminusModuleAsyncOptions,
} from './interfaces';
export declare class TerminusCoreModule {
  static forRoot(options: TerminusModuleOptions): DynamicModule;
  static forRootAsync(options: TerminusModuleAsyncOptions): DynamicModule;
  private static createAsyncProviders;
  private static createAsyncOptionsProvider;
}

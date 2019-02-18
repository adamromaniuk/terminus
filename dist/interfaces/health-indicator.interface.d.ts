export declare type HealthIndicatorResult = {
  [key: string]: {
    status: string;
    [optionalKeys: string]: unknown;
  };
};
export declare type HealthIndicatorFunction = () => Promise<
  HealthIndicatorResult
>;

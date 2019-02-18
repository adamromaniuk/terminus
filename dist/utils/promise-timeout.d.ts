export declare class TimeoutError extends Error {}
export declare const promiseTimeout: (
  ms: number,
  promise: Promise<unknown>,
) => Promise<unknown>;

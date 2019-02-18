"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terminus_1 = require("@godaddy/terminus");
class TimeoutError extends terminus_1.HealthCheckError {
    constructor(timeout, cause) {
        super(`timeout of ${timeout}ms exceeded`, cause);
    }
}
exports.TimeoutError = TimeoutError;

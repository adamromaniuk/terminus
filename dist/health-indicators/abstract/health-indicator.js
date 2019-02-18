"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HealthIndicator {
    getStatus(key, isHealthy, options) {
        return {
            [key]: Object.assign({ status: isHealthy ? 'up' : 'down' }, options),
        };
    }
}
exports.HealthIndicator = HealthIndicator;

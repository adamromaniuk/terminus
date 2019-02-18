"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const terminus_1 = require("@godaddy/terminus");
const errors_1 = require("../../errors");
const utils_1 = require("../../utils");
const health_indicator_1 = require("./health-indicator");
class AbstractDatabaseHealthIndicator extends health_indicator_1.HealthIndicator {
    constructor(connection) {
        super();
        this.connection = connection;
    }
    pingCheck(key, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let isHealthy = false;
            const connection = options.connection || this.connection;
            const timeout = options.timeout || 1000;
            if (!connection) {
                throw new errors_1.ConnectionNotFoundError(this.getStatus(key, isHealthy, {
                    message: 'Connection provider not found in application context',
                }));
            }
            try {
                yield this.pingDb(connection, timeout);
                isHealthy = true;
            }
            catch (err) {
                if (err instanceof utils_1.TimeoutError) {
                    throw new errors_1.TimeoutError(timeout, this.getStatus(key, isHealthy, {
                        message: `timeout of ${timeout}ms exceeded`,
                    }));
                }
            }
            if (isHealthy) {
                return this.getStatus(key, isHealthy);
            }
            else {
                throw new terminus_1.HealthCheckError(`${key} is not available`, this.getStatus(key, isHealthy));
            }
        });
    }
}
exports.AbstractDatabaseHealthIndicator = AbstractDatabaseHealthIndicator;

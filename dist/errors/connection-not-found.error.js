"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terminus_1 = require("@godaddy/terminus");
class ConnectionNotFoundError extends terminus_1.HealthCheckError {
    constructor(cause) {
        super('Connection provider not found in application context', cause);
    }
}
exports.ConnectionNotFoundError = ConnectionNotFoundError;

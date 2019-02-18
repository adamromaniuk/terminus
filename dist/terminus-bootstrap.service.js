"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var TerminusBootstrapService_1;
"use strict";
const common_1 = require("@nestjs/common");
const terminus_constants_1 = require("./terminus.constants");
const core_1 = require("@nestjs/core");
const terminus_1 = require("@godaddy/terminus");
let TerminusBootstrapService = TerminusBootstrapService_1 = class TerminusBootstrapService {
    constructor(options, terminus, refHost) {
        this.options = options;
        this.terminus = terminus;
        this.refHost = refHost;
        this.logger = new common_1.Logger(TerminusBootstrapService_1.name, true);
    }
    executeHealthIndicators(healthIndicators) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = [];
            const errors = [];
            yield Promise.all(healthIndicators
                .map(healthIndicator => healthIndicator())
                .map((p) => p.catch((error) => {
                if (error instanceof terminus_1.HealthCheckError) {
                    errors.push(error.causes);
                }
                else {
                    throw error;
                }
            }))
                .map((p) => p.then((result) => result && results.push(result))));
            return { results, errors };
        });
    }
    logError(message, error) {
        if (error.causes) {
            const healthError = error;
            message = `${message} ${JSON.stringify(healthError.causes)}`;
        }
        this.logger.error(message, error.stack);
    }
    logHealthCheckRegister(healthChecks) {
        Object.keys(healthChecks).forEach(endpoint => this.logger.log(`Mapped {${endpoint}, GET} healthcheck route`, 'TerminusExplorer'));
    }
    getHealthCheckExecutor(endpoint) {
        return () => __awaiter(this, void 0, void 0, function* () {
            const { results, errors } = yield this.executeHealthIndicators(endpoint.healthIndicators);
            const info = (results || [])
                .concat(errors || [])
                .reduce((previous, current) => Object.assign(previous, current), {});
            if (errors.length) {
                throw new terminus_1.HealthCheckError('Healthcheck failed', info);
            }
            else {
                return info;
            }
        });
    }
    getHealthChecksMap() {
        return this.options.endpoints.reduce((healthChecks, endpoint) => {
            healthChecks[endpoint.url] = this.getHealthCheckExecutor(endpoint);
            return healthChecks;
        }, {});
    }
    bootstrapTerminus() {
        const healthChecks = this.getHealthChecksMap();
        this.terminus(this.httpServer, {
            healthChecks,
            logger: this.options.logger || this.logError.bind(this),
        });
        this.logHealthCheckRegister(healthChecks);
    }
    onApplicationBootstrap() {
        this.httpServer = this.refHost.applicationRef.getHttpServer();
        this.bootstrapTerminus();
    }
};
TerminusBootstrapService = TerminusBootstrapService_1 = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(terminus_constants_1.TERMINUS_MODULE_OPTIONS)),
    __param(1, common_1.Inject(terminus_constants_1.TERMINUS_LIB)),
    __metadata("design:paramtypes", [Object, Function, core_1.ApplicationReferenceHost])
], TerminusBootstrapService);
exports.TerminusBootstrapService = TerminusBootstrapService;

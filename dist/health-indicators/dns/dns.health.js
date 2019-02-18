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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const health_indicator_1 = require("../abstract/health-indicator");
const terminus_1 = require("@godaddy/terminus");
let DNSHealthIndicator = class DNSHealthIndicator extends health_indicator_1.HealthIndicator {
    constructor(httpService) {
        super();
        this.httpService = httpService;
    }
    pingDNS(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.httpService.request(Object.assign({ url }, options)).toPromise();
        });
    }
    generateHttpError(key, error) {
        if (error) {
            let statusCode;
            let statusText;
            if (error.response) {
                statusCode = error.response.status;
                statusText = error.response.statusText;
            }
            throw new terminus_1.HealthCheckError(error.message, this.getStatus(key, false, {
                message: error.message,
                statusCode,
                statusText,
            }));
        }
    }
    pingCheck(key, url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let isHealthy = false;
            try {
                yield this.pingDNS(url, options);
                isHealthy = true;
            }
            catch (err) {
                this.generateHttpError(key, err);
            }
            return this.getStatus(key, isHealthy);
        });
    }
};
DNSHealthIndicator = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService])
], DNSHealthIndicator);
exports.DNSHealthIndicator = DNSHealthIndicator;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var TerminusCoreModule_1;
"use strict";
const common_1 = require("@nestjs/common");
const terminus_constants_1 = require("./terminus.constants");
const terminus_bootstrap_service_1 = require("./terminus-bootstrap.service");
const terminus_lib_provider_1 = require("./terminus-lib.provider");
const terminus_module_1 = require("./terminus.module");
const _1 = require(".");
const health_indicators_1 = require("./health-indicators");
let TerminusCoreModule = TerminusCoreModule_1 = class TerminusCoreModule {
    static forRoot(options) {
        const terminusModuleOptions = {
            provide: terminus_constants_1.TERMINUS_MODULE_OPTIONS,
            useValue: options,
        };
        return {
            module: TerminusCoreModule_1,
            imports: [common_1.HttpModule],
            providers: [
                terminusModuleOptions,
                terminus_lib_provider_1.TerminusLibProvider,
                terminus_bootstrap_service_1.TerminusBootstrapService,
                _1.DatabaseHealthIndicator,
                _1.MongooseHealthIndicator,
            ],
            exports: [_1.DatabaseHealthIndicator, _1.MongooseHealthIndicator],
        };
    }
    static forRootAsync(options) {
        const asyncProviders = this.createAsyncProviders(options);
        return {
            module: terminus_module_1.TerminusModule,
            imports: [...(options.imports || []), common_1.HttpModule],
            providers: [
                ...asyncProviders,
                terminus_bootstrap_service_1.TerminusBootstrapService,
                terminus_lib_provider_1.TerminusLibProvider,
                _1.DatabaseHealthIndicator,
                health_indicators_1.DNSHealthIndicator,
                _1.MongooseHealthIndicator,
            ],
            exports: [
                _1.DatabaseHealthIndicator,
                health_indicators_1.DNSHealthIndicator,
                _1.MongooseHealthIndicator,
            ],
        };
    }
    static createAsyncProviders(options) {
        if (options.useFactory || options.useExisting) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: terminus_constants_1.TERMINUS_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: terminus_constants_1.TERMINUS_MODULE_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return yield optionsFactory.createTerminusOptions(); }),
            inject: [options.useClass || options.useExisting],
        };
    }
};
TerminusCoreModule = TerminusCoreModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({
        providers: [terminus_lib_provider_1.TerminusLibProvider, terminus_bootstrap_service_1.TerminusBootstrapService],
        exports: [],
    })
], TerminusCoreModule);
exports.TerminusCoreModule = TerminusCoreModule;

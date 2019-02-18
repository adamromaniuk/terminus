"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var TerminusModule_1;
"use strict";
const common_1 = require("@nestjs/common");
const terminus_core_module_1 = require("./terminus-core.module");
let TerminusModule = TerminusModule_1 = class TerminusModule {
    static forRoot(options) {
        return {
            module: TerminusModule_1,
            imports: [terminus_core_module_1.TerminusCoreModule.forRoot(options)],
        };
    }
    static forRootAsync(options) {
        return {
            module: TerminusModule_1,
            imports: [terminus_core_module_1.TerminusCoreModule.forRootAsync(options)],
        };
    }
};
TerminusModule = TerminusModule_1 = __decorate([
    common_1.Module({})
], TerminusModule);
exports.TerminusModule = TerminusModule;

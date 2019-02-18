"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terminus_constants_1 = require("./terminus.constants");
const terminus_1 = require("@godaddy/terminus");
exports.TerminusLibProvider = {
    provide: terminus_constants_1.TERMINUS_LIB,
    useValue: terminus_1.createTerminus,
};

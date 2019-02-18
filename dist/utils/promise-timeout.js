"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimeoutError extends Error {
}
exports.TimeoutError = TimeoutError;
exports.promiseTimeout = function (ms, promise) {
    let timeout = new Promise((_, reject) => {
        let id = setTimeout(() => {
            clearTimeout(id);
            reject(new TimeoutError('Timed out in ' + ms + 'ms.'));
        }, ms);
    });
    return Promise.race([promise, timeout]);
};

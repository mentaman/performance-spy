"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentReset = exports.resetCountUpdate = void 0;
let resetCount = -1;
const resetCountUpdate = () => {
    resetCount++;
};
exports.resetCountUpdate = resetCountUpdate;
const getCurrentReset = () => {
    return resetCount;
};
exports.getCurrentReset = getCurrentReset;

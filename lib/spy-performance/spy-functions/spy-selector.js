"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spyCachedCreatorTime = exports.spyCreateSelectorTime = void 0;
const summaries_1 = require("../summary/summaries");
const spy_function_time_1 = require("./spy-function-time");
let currentSelectorKey = null;
let currentCacheSelectorKey = null;
const spySelectorTime = (originalSelectorFunc) => {
    return function () {
        const combinerFunc = arguments[arguments.length - 1];
        let key = combinerFunc.toString().substr(0, 600);
        if (combinerFunc.name === "resultFuncWithRecomputations") {
            key = currentCacheSelectorKey;
            currentCacheSelectorKey = null;
        }
        currentSelectorKey = key;
        const spiedFunction = originalSelectorFunc(...arguments);
        currentSelectorKey = null;
        return (0, spy_function_time_1.spyFunctionTime)(spiedFunction, summaries_1.selectorsPerfStat, key);
    };
};
const spySelectorMemoizer = (originalMemoized) => {
    return function () {
        const key = currentSelectorKey;
        currentSelectorKey = null;
        if (key !== null) {
            arguments[0] = (0, spy_function_time_1.spyFunctionTime)(arguments[0], summaries_1.combinerPerfStat, key, { checkArgs: true });
        }
        const spiedFunction = originalMemoized(...arguments);
        return spiedFunction;
    };
};
const spyCreateSelectorTime = function (originalCreateSelectorFunc) {
    return function () {
        arguments[0] = spySelectorMemoizer(arguments[0]);
        const spiedFunction = originalCreateSelectorFunc(...arguments);
        return spySelectorTime(spiedFunction);
    };
};
exports.spyCreateSelectorTime = spyCreateSelectorTime;
const spyCachedInnerInnerTime = function (myfunc, key) {
    return function () {
        currentCacheSelectorKey = key;
        const spiedFunction = myfunc(...arguments);
        currentCacheSelectorKey = null;
        return spiedFunction;
    };
};
const spyCachedInnerTime = function (myfunc, key) {
    return function () {
        const spiedFunction = myfunc(...arguments);
        return spyCachedInnerInnerTime(spiedFunction, key);
    };
};
const spyCachedCreatorTime = function (selectorFunc) {
    return function () {
        const combinerFunc = arguments[arguments.length - 1];
        const key = combinerFunc.toString().substr(0, 500);
        const spiedFunction = selectorFunc(...arguments);
        return spyCachedInnerTime(spiedFunction, key);
    };
};
exports.spyCachedCreatorTime = spyCachedCreatorTime;

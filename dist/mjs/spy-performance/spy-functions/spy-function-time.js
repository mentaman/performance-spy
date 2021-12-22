import { getCurrentReset } from "../summary/reset-counter";
export const spyFunctionTime = (myfunc, perfstat, key, { beforeResultsChecker = null, resultsChecker = null, checkArgs = false, keepFuncRefs = {} } = {}) => {
    return function () {
        if (keepFuncRefs.lastReset && getCurrentReset() > keepFuncRefs.lastReset) {
            keepFuncRefs.count = undefined;
            keepFuncRefs.lastArgs = undefined;
            keepFuncRefs.lastArgsKey = undefined;
        }
        keepFuncRefs.lastReset = getCurrentReset();
        if (beforeResultsChecker) {
            beforeResultsChecker(this, arguments);
        }
        const startTime = performance.now();
        const res = myfunc(...arguments);
        const endTime = performance.now();
        const duration = endTime - startTime;
        perfstat.addDurationStat(key, duration);
        if (!keepFuncRefs.count) {
            keepFuncRefs.count = 0;
        }
        keepFuncRefs.count++;
        perfstat.maxStat(key, "maxCount", keepFuncRefs.count);
        if (checkArgs) {
            if (keepFuncRefs.lastArgs) {
                let wasChanged = false;
                for (let argIdx = 0; argIdx < arguments.length; argIdx++) {
                    if (keepFuncRefs.lastArgs[argIdx] !== arguments[argIdx]) {
                        perfstat.getSubStat(key, "args").forwardStat(argIdx.toString(), "count");
                        wasChanged = true;
                    }
                }
                if (keepFuncRefs.lastArgsKey !== key) {
                    console.log("last key bug", keepFuncRefs.lastArgsKey, key);
                }
                if (!wasChanged) {
                    console.log("wasn't changed!!!", key, arguments, keepFuncRefs.lastArgs);
                }
            }
            keepFuncRefs.lastArgs = arguments;
            keepFuncRefs.lastArgsKey = key;
        }
        if (resultsChecker) {
            resultsChecker(this, res, arguments, perfstat, key);
        }
        return res;
    };
};

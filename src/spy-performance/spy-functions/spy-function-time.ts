import { getCurrentReset } from "../summary/reset-counter";
import { PerfStatsStuff } from "../performance-timer";

interface KeepFuncRefs {
  lastReset?: number;
  count?: number;
  lastArgs?: IArguments;
  lastArgsKey?: string;
}

export const spyFunctionTime = (
  fn: (...args: any[]) => any,
  perfstat: PerfStatsStuff,
  key: string,
  {
    beforeResultsChecker,
    resultsChecker,
    checkArgs = false,
    keepFuncRefs = {}
  }: {
    beforeResultsChecker?: (thisRef: any, args: IArguments) => void;
    resultsChecker?: (thisRef: any, res: any, args: IArguments, perfstat: PerfStatsStuff, key: string) => void;
    checkArgs?: boolean;
    keepFuncRefs?: KeepFuncRefs;
  } = {}
) => (...args: any) => {
  if (keepFuncRefs.lastReset && getCurrentReset() > keepFuncRefs.lastReset) {
    keepFuncRefs.count = undefined;
    keepFuncRefs.lastArgs = undefined;
    keepFuncRefs.lastArgsKey = undefined;
  }

  keepFuncRefs.lastReset = getCurrentReset();
  if (beforeResultsChecker) {
    beforeResultsChecker(this, args);
  }

  const startTime = performance.now();
  const res = fn(...args);
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

      for (let argIdx = 0; argIdx < args.length; argIdx++) {
        if (keepFuncRefs.lastArgs[argIdx] !== args[argIdx]) {
          (perfstat.getSubStat(key, "args") as PerfStatsStuff).forwardStat(argIdx.toString(), "count");
          wasChanged = true;
        }
      }

      if (keepFuncRefs.lastArgsKey !== key) {
        // warning - shouldn't happen
      }

      if (!wasChanged) {
        // warning - shouldn't happen
      }
    }

    keepFuncRefs.lastArgs = args;
    keepFuncRefs.lastArgsKey = key;
  }

  if (resultsChecker) {
    resultsChecker(this, res, args, perfstat, key);
  }

  return res;
};

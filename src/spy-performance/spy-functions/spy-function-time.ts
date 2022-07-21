import { getCurrentSummaryForUse } from "../summary/summary-context";
import { PerfStatsStuff } from "../performance-timer";
import { Summaries } from "../summary/summaries";
import {Observer} from "../callbacks";

interface KeepFuncRefs {
  lastReset?: number;
  count?: number;
  lastArgs?: IArguments;
  lastArgsKey?: string;
}

export const spyFunctionTime = (
  fn: (...args: any[]) => any,
  perfstat: (summaries: Summaries) => PerfStatsStuff,
  key: string,
  {
    beforeResultsChecker,
    resultsChecker,
    checkArgs = false,
    keepFuncRefs = {},
    observer,
  }: {
    beforeResultsChecker?: (thisRef: any, args: IArguments) => void;
    resultsChecker?: (thisRef: any, res: any, args: IArguments, perfstat: PerfStatsStuff, key: string) => void;
    checkArgs?: boolean;
    keepFuncRefs?: KeepFuncRefs;
    observer?: Observer;
  } = {}
) => (...args: any) => {
  const currentSummary = getCurrentSummaryForUse();
  if (keepFuncRefs.lastReset && currentSummary.getCurrentReset() > keepFuncRefs.lastReset) {
    keepFuncRefs.count = undefined;
    keepFuncRefs.lastArgs = undefined;
    keepFuncRefs.lastArgsKey = undefined;
  }

  keepFuncRefs.lastReset = currentSummary.getCurrentReset();
  if (beforeResultsChecker) {
    beforeResultsChecker(this, args);
  }

  const startTime = performance.now();
  const res = fn(...args);
  const endTime = performance.now();
  const duration = endTime - startTime;
  observer?.notify(key, duration);
  perfstat(currentSummary).addDurationStat(key, duration);

  if (!keepFuncRefs.count) {
    keepFuncRefs.count = 0;
  }

  keepFuncRefs.count++;
  perfstat(currentSummary).maxStat(key, "maxCount", keepFuncRefs.count);

  if (checkArgs) {
    if (keepFuncRefs.lastArgs) {
      let wasChanged = false;

      for (let argIdx = 0; argIdx < args.length; argIdx++) {
        if (keepFuncRefs.lastArgs[argIdx] !== args[argIdx]) {
          (perfstat(currentSummary).getSubStat(key, "args") as PerfStatsStuff).forwardStat(argIdx.toString(), "count");
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
    resultsChecker(this, res, args, perfstat(currentSummary), key);
  }

  return res;
};

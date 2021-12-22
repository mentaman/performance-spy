import { getCustomTimers, resetCustomTimers } from "../custom-timer/custom-timer";
import {
  allPerfStats,
  combinerPerfStat,
  dispatchPerfStat,
  selectorsPerfStat
} from "../summary/summaries";
import { resetCountUpdate } from "../summary/reset-counter";

export const perfStatsReset = function () {
  resetCustomTimers();
  resetCountUpdate();
  for (const perfStat of allPerfStats) {
    perfStat.reset();
  }
};

export const printPerfSummary = function () {
  console.log("longest selectors");
  const longestSelectors = Object.entries(selectorsPerfStat.stats)
    .map(([key, value]) => ({ ...value, key }))
    .sort((a, b) => b.duration - a.duration);
  console.log(longestSelectors);

  console.log("longest combiners");
  const longestCombiners = Object.entries(combinerPerfStat.stats)
    .map(([key, value]) => ({ ...value, key }))
    .sort((a, b) => b.duration - a.duration);
  console.log(longestCombiners);

  console.log("most recalculated combiners");
  const mostCalculatedCombiners = Object.entries(combinerPerfStat.stats)
    .map(([key, value]) => ({ ...value, key }))
    .sort((a, b) => b.maxCount - a.maxCount);
  console.log(mostCalculatedCombiners);

  console.log("longest dispatches");
  const longestDispatches = Object.entries(dispatchPerfStat.stats)
    .map(([key, value]) => ({ ...value, key }))
    .sort((a, b) => b.duration - a.duration);
  console.log(longestDispatches);

  console.log("custom timers");
  const customTimersPerfStat = getCustomTimers();
  console.log(customTimersPerfStat);

  return {
    longestSelectors,
    longestCombiners,
    mostCalculatedCombiners,
    longestDispatches,
    customTimersPerfStat
  };
};

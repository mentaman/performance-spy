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

export const getPerfSummary = function () {
  const longestSelectors = Object.entries(selectorsPerfStat.stats)
    .map(([key, value]) => ({ ...value, key }))
    .sort((a, b) => b.duration - a.duration);

  const longestCombiners = Object.entries(combinerPerfStat.stats)
    .map(([key, value]) => ({ ...value, key }))
    .sort((a, b) => b.duration - a.duration);

  const mostCalculatedCombiners = Object.entries(combinerPerfStat.stats)
    .map(([key, value]) => ({ ...value, key }))
    .sort((a, b) => b.maxCount - a.maxCount);

  const longestDispatches = Object.entries(dispatchPerfStat.stats)
    .map(([key, value]) => ({ ...value, key }))
    .sort((a, b) => b.duration - a.duration);

  const customTimersPerfStat = getCustomTimers();

  return {
    longestSelectors,
    longestCombiners,
    mostCalculatedCombiners,
    longestDispatches,
    customTimersPerfStat
  };
};

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
  const a = Object.entries(selectorsPerfStat.stats)
  const b = ({ ...a[1], key: a[0] })
  const c = Object.values(selectorsPerfStat.stats)[0]
  const d = c.duration

  const longestSelectors = Object.values(selectorsPerfStat.stats)
    .sort((a, b) => (b.duration || 0) - (a.duration || 0));

  const longestCombiners = Object.entries(combinerPerfStat.stats)
    .map(([key, value]) => ({ ...value, key }))
    .sort((a, b) => (b.duration || 0) - (a.duration || 0));

  const mostCalculatedCombiners = Object.entries(combinerPerfStat.stats)
    .map(([key, value]) => ({ ...value, key }))
    .sort((a, b) => (b.maxCount || 0) - (a.maxCount || 0));

  const longestDispatches = Object.entries(dispatchPerfStat.stats)
    .map(([key, value]) => ({ ...value, key }))
    .sort((a, b) => (b.duration || 0) - (a.duration || 0));

  const customTimersPerfStat = getCustomTimers();

  return {
    longestSelectors,
    longestCombiners,
    mostCalculatedCombiners,
    longestDispatches,
    customTimersPerfStat
  };
};

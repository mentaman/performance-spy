import { getCustomTimers, resetCustomTimers } from "../custom-timer/custom-timer";
import {
  allPerfStats,
  combinerPerfStat,
  dispatchPerfStat,
  selectorsPerfStat,
  reducersPerfStat
} from "../summary/summaries";
import { resetCountUpdate } from "../summary/reset-counter";
import { PerfStatsStuff, Stat } from "../performance-timer";

export const perfStatsReset = function () {
  resetCustomTimers();
  resetCountUpdate();
  for (const perfStat of allPerfStats) {
    perfStat.reset();
  }
};

function reducerChangedTimes(r: Stat): number {
  return Object.values((r?.args as PerfStatsStuff)?.stats || {})
               .reduce((total, num) => total+(num.count || 0), 0);
}

export const getPerfSummary = function () {
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

  const mostChangedReducers = Object.entries(reducersPerfStat.stats)
    .map(([key, value]) => ({...value, key, changedTimes: reducerChangedTimes(value)}))
    .sort((a, b) => (b.changedTimes || 0) - (a.changedTimes || 0));

  const customTimersPerfStat = getCustomTimers();

  return {
    longestSelectors,
    longestCombiners,
    mostCalculatedCombiners,
    mostChangedReducers,
    longestDispatches,
    customTimersPerfStat
  };
};

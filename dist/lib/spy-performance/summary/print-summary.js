"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPerfSummary = exports.perfStatsReset = void 0;
const custom_timer_1 = require("../custom-timer/custom-timer");
const summaries_1 = require("../summary/summaries");
const reset_counter_1 = require("../summary/reset-counter");
const perfStatsReset = function () {
    (0, custom_timer_1.resetCustomTimers)();
    (0, reset_counter_1.resetCountUpdate)();
    for (const perfStat of summaries_1.allPerfStats) {
        perfStat.reset();
    }
};
exports.perfStatsReset = perfStatsReset;
const getPerfSummary = function () {
    const longestSelectors = Object.entries(summaries_1.selectorsPerfStat.stats)
        .map(([key, value]) => (Object.assign(Object.assign({}, value), { key })))
        .sort((a, b) => b.duration - a.duration);
    const longestCombiners = Object.entries(summaries_1.combinerPerfStat.stats)
        .map(([key, value]) => (Object.assign(Object.assign({}, value), { key })))
        .sort((a, b) => b.duration - a.duration);
    const mostCalculatedCombiners = Object.entries(summaries_1.combinerPerfStat.stats)
        .map(([key, value]) => (Object.assign(Object.assign({}, value), { key })))
        .sort((a, b) => b.maxCount - a.maxCount);
    const longestDispatches = Object.entries(summaries_1.dispatchPerfStat.stats)
        .map(([key, value]) => (Object.assign(Object.assign({}, value), { key })))
        .sort((a, b) => b.duration - a.duration);
    const customTimersPerfStat = (0, custom_timer_1.getCustomTimers)();
    return {
        longestSelectors,
        longestCombiners,
        mostCalculatedCombiners,
        longestDispatches,
        customTimersPerfStat
    };
};
exports.getPerfSummary = getPerfSummary;

import { PerfStat } from "../custom-timer/custom-timer";
import "zone.js";
import { PerfStatsStuff, Stat } from "../performance-timer";

function reducerChangedTimes(r: Stat): number {
    return Object.values((r?.args as PerfStatsStuff)?.stats || {})
                 .reduce((total, num) => total+(num.count || 0), 0);
  }
  
export class Summaries {
    selectorsPerfStat: PerfStatsStuff;
    dispatchPerfStat: PerfStatsStuff;
    reducersPerfStat: PerfStatsStuff;
    combinerPerfStat: PerfStatsStuff;
    allPerfStats: PerfStatsStuff[];
    customTimersPerfStat: {[key: string]: PerfStat};
    currentReset: number = -1;

    constructor() {
        this.customTimersPerfStat = {};
        this.selectorsPerfStat = new PerfStatsStuff("duration_by_key");
        this.dispatchPerfStat = new PerfStatsStuff("duration_by_key");
        this.reducersPerfStat = new PerfStatsStuff("duration_by_key_with_args");
        this.combinerPerfStat = new PerfStatsStuff("duration_by_key_with_args");
        this.allPerfStats = [this.selectorsPerfStat, this.dispatchPerfStat, this.reducersPerfStat, this.combinerPerfStat];
    }

    getCurrentReset() {
        return this.currentReset;
    }

    reset() {
        this.currentReset++;
        this.customTimersPerfStat = {};

        for (const perfStat of this.allPerfStats) {
            perfStat.reset();
        }
    }

    getSummary() {
        const { combinerPerfStat, dispatchPerfStat, selectorsPerfStat, reducersPerfStat } = this;
        
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

        const customTimersPerfStat = this.customTimersPerfStat;

        return {
            longestSelectors,
            longestCombiners,
            mostCalculatedCombiners,
            mostChangedReducers,
            longestDispatches,
            customTimersPerfStat
        };
    }
}


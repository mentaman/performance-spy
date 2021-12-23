import { PerfStatsStuff } from "../performance-timer";
export const selectorsPerfStat = new PerfStatsStuff("duration_by_key");
export const dispatchPerfStat = new PerfStatsStuff("duration_by_key");
export const combinerPerfStat = new PerfStatsStuff("duration_by_key_with_args");
export const allPerfStats = [selectorsPerfStat, dispatchPerfStat, combinerPerfStat];

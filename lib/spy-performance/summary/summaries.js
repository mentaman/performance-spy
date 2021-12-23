"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allPerfStats = exports.combinerPerfStat = exports.dispatchPerfStat = exports.selectorsPerfStat = void 0;
const performance_timer_1 = require("../performance-timer");
exports.selectorsPerfStat = new performance_timer_1.PerfStatsStuff("duration_by_key");
exports.dispatchPerfStat = new performance_timer_1.PerfStatsStuff("duration_by_key");
exports.combinerPerfStat = new performance_timer_1.PerfStatsStuff("duration_by_key_with_args");
exports.allPerfStats = [exports.selectorsPerfStat, exports.dispatchPerfStat, exports.combinerPerfStat];

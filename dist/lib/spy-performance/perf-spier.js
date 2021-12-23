"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableSpying = void 0;
require("./spy-functions/spy-function-time");
const spy_thunk_1 = require("./spy-functions/spy-thunk");
const spy_selector_1 = require("./spy-functions/spy-selector");
const print_summary_1 = require("./summary/print-summary");
const custom_timer_1 = require("./custom-timer/custom-timer");
const enableSpying = () => {
    if (typeof window !== "undefined") {
        window.perfStatsReset = print_summary_1.perfStatsReset;
        window.getPerfSummary = print_summary_1.getPerfSummary;
        window.spyThunk = spy_thunk_1.spyThunk;
        window.spyCreateSelectorTime = spy_selector_1.spyCreateSelectorTime;
        window.spyCachedCreatorTime = spy_selector_1.spyCachedCreatorTime;
        window.startCustomTimer = custom_timer_1.startCustomTimer;
    }
};
exports.enableSpying = enableSpying;

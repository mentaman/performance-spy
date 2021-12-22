import "./spy-functions/spy-function-time";
import { spyThunk } from "./spy-functions/spy-thunk";
import { spyCreateSelectorTime, spyCachedCreatorTime } from "./spy-functions/spy-selector";

import { perfStatsReset, printPerfSummary } from "./summary/print-summary";
import { startCustomTimer, CustomSpyFunctionsTimer } from "./custom-timer/custom-timer";

declare global {
    interface Window {
        perfStatsReset: () => void;
        printPerfSummary: () => void;
        spyThunk: (thunk?: any) => any;
        spyCreateSelectorTime: (createSelector: any) => any;
        spyCachedCreatorTime: (cachedCreatorTime: any) => any;
        startCustomTimer: (key: string) => CustomSpyFunctionsTimer
    }
}
if(typeof window !== "undefined") {
    window.perfStatsReset = perfStatsReset;
    window.printPerfSummary = printPerfSummary;
    window.spyThunk = spyThunk;
    window.spyCreateSelectorTime = spyCreateSelectorTime;
    window.spyCachedCreatorTime = spyCachedCreatorTime;
    window.startCustomTimer = startCustomTimer;
}
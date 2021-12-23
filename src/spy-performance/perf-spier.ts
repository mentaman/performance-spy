import "./spy-functions/spy-function-time";
import { spyThunk } from "./spy-functions/spy-thunk";
import { spyCreateSelectorTime, spyCachedCreatorTime } from "./spy-functions/spy-selector";

import { perfStatsReset, getPerfSummary } from "./summary/print-summary";
import { startCustomTimer, CustomSpyFunctionsTimer } from "./custom-timer/custom-timer";

declare global {
    interface Window {
        perfStatsReset: () => void;
        getPerfSummary: () => void;
        spyThunk: (thunk?: any) => any;
        spyCreateSelectorTime: (createSelector: any) => any;
        spyCachedCreatorTime: (cachedCreatorTime: any) => any;
        startCustomTimer: (key: string) => CustomSpyFunctionsTimer
    }
}
export const enableSpying = () => {
    if(typeof window !== "undefined") {
        window.perfStatsReset = perfStatsReset;
        window.getPerfSummary = getPerfSummary;
        window.spyThunk = spyThunk;
        window.spyCreateSelectorTime = spyCreateSelectorTime;
        window.spyCachedCreatorTime = spyCachedCreatorTime;
        window.startCustomTimer = startCustomTimer;
    }
}
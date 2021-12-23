import "./spy-functions/spy-function-time";
import { spyThunk } from "./spy-functions/spy-thunk";
import { spyCreateSelectorTime, spyCachedCreatorTime } from "./spy-functions/spy-selector";
import { perfStatsReset, getPerfSummary } from "./summary/print-summary";
import { startCustomTimer } from "./custom-timer/custom-timer";
export const enableSpying = () => {
    if (typeof window !== "undefined") {
        window.perfStatsReset = perfStatsReset;
        window.getPerfSummary = getPerfSummary;
        window.spyThunk = spyThunk;
        window.spyCreateSelectorTime = spyCreateSelectorTime;
        window.spyCachedCreatorTime = spyCachedCreatorTime;
        window.startCustomTimer = startCustomTimer;
    }
};

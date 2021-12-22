import "./spy-functions/spy-function-time";
import { CustomSpyFunctionsTimer } from "./custom-timer/custom-timer";
declare global {
    interface Window {
        perfStatsReset: () => void;
        printPerfSummary: () => void;
        spyThunk: (thunk?: any) => any;
        spyCreateSelectorTime: (createSelector: any) => any;
        spyCachedCreatorTime: (cachedCreatorTime: any) => any;
        startCustomTimer: (key: string) => CustomSpyFunctionsTimer;
    }
}

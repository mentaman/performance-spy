export declare const perfStatsReset: () => void;
export declare const getPerfSummary: () => {
    longestSelectors: any[];
    longestCombiners: any[];
    mostCalculatedCombiners: any[];
    longestDispatches: any[];
    customTimersPerfStat: {
        [key: string]: {
            times: number;
            duration: number;
            "moreThan0.5msTimes": number;
            moreThan1msTimes: number;
            moreThan10msTimes: number;
            moreThan100msTimes: number;
            moreThanFrameTimes: number;
            maxDuration: number | null;
            minDuration: number | null;
            avgTime?: number | undefined;
        };
    };
};

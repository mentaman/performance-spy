declare type perfStat = {
    times: number;
    duration: number;
    "moreThan0.5msTimes": number;
    moreThan1msTimes: number;
    moreThan10msTimes: number;
    moreThan100msTimes: number;
    moreThanFrameTimes: number;
    maxDuration: number | null;
    minDuration: number | null;
    avgTime?: number;
};
export declare const resetCustomTimers: () => void;
export declare const getCustomTimers: () => {
    [key: string]: perfStat;
};
export declare class CustomSpyFunctionsTimer {
    name: string;
    startTime: number;
    endTime?: number;
    duration?: number;
    constructor(name: string);
    end(): void;
}
export declare const startCustomTimer: (name: string) => CustomSpyFunctionsTimer;
export {};

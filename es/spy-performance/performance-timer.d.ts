export declare class PerfStatsStuff {
    type: string;
    stats: {
        [key: string]: any;
    };
    constructor(type?: string);
    createStat(key: string, name: string, defaultValue: number | PerfStatsStuff): void;
    statExists(key: string, name: string): any;
    getSubStat(key: string, name: string): any;
    setStat(key: string, name: string, value: number): void;
    increaseStat(key: string, name: string, increaseBy: number): void;
    maxStat(key: string, name: string, value: number): void;
    minStat(key: string, name: string, value: number): void;
    forwardStat(key: string, name: string): void;
    addDurationStat(key: string, duration: number): void;
    reset(): void;
}

import { Summaries } from "./summaries";

export const GlobalSummaries = new Summaries();

export const getSummaryFor = async (func: () => Promise<any>) => {
    const summaries = new Summaries();
    let promise;
    const domain = await import("domain");
    const d = domain.create();
    (d as any).summaries = summaries;
    d.run(() => {
        promise = func();
    })
    await promise;
    return summaries.getSummary();
}

export const getCurrentSummaryForUse = (): Summaries => {
    if(typeof process === "undefined") return GlobalSummaries;
    return (process as any)?.domain?.summaries || GlobalSummaries;
};

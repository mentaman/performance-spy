import domain from "domain";
import { Summaries } from "./summaries";

export const GlobalSummaries = new Summaries();

export const getSummaryFor = (func: () => void) => {
    const summaries = new Summaries();
    const d = domain.create();
    (d as any).summaries = summaries;
    d.run(() => {
        func();
    })
    return summaries.getSummary();
}

export const getCurrentSummaryForUse = (): Summaries => {
    return (process as any)?.domain?.summaries || GlobalSummaries;
};

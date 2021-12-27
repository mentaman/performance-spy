import "zone.js";
import { Summaries } from "./summaries";

export const GlobalSummaries = new Summaries();

let idx=0;
export const getSummaryFor = (func: () => void) => {
    const summaries = new Summaries();
    Zone.current.fork({
        name: "summary"+(idx++),
        properties: {
            summaries
        }
    }).run(func);
    return summaries.getSummary();
}

export const getCurrentSummaryForUse = (): Summaries => {
    return Zone.current.get("summaries") || GlobalSummaries;
};

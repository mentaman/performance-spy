import { Summaries } from "./summaries";

export const GlobalSummaries = new Summaries();

export const getCurrentSummaryForUse = (): Summaries => {
    return GlobalSummaries;
};

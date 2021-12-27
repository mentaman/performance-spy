import { getCurrentSummaryForUse } from "./summary-context";

export const perfStatsReset = function () {
  getCurrentSummaryForUse().reset();
};


export const getPerfSummary = function () {
  return getCurrentSummaryForUse().getSummary();
};

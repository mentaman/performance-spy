const path = require("path");
const { enableSpying, perfStatsReset, getPerfSummary } = require("performance-spy");

enableSpying();

beforeEach(() => {
  perfStatsReset();
});

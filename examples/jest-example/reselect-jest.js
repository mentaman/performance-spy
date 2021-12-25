const { createSelector } = require("reselect");

let selectorExample;

describe("reselect performance spying", () => {
    beforeEach(() => {
        selectorExample = createSelector((a) => a, (_a, b) => b, (_resA, _resB) => 100);
    })

    it("should find only one combiner calculation", () => {
        selectorExample(1, 2);

        const summary = getPerfSummary();

        expect(summary.mostCalculatedCombiners.length).toEqual(1);
    })

    it("should calculate only once", () => {
        selectorExample(1, 2);
        selectorExample(1, 2);

        const summary = getPerfSummary();

        expect(summary.mostCalculatedCombiners[0].maxCount).toEqual(1);
    })

    it("should calculate three times", () => {
        selectorExample(1, 2);
        selectorExample(1, 3);
        selectorExample(1, 2);

        const summary = getPerfSummary();

        expect(summary.mostCalculatedCombiners[0].maxCount).toEqual(3);
    })

    it("should find which param caused it to recalculate", () => {
        selectorExample(1, 2);
        selectorExample(1, 3);
        selectorExample(1, 2);

        const summary = getPerfSummary();

        expect(summary.mostCalculatedCombiners[0].args.stats['1'].count).toEqual(2);
    })
})
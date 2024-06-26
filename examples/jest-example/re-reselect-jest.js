const { createCachedSelector } = require("re-reselect");

let selectorExample;

const keyOne = "a";
const keyTwo = "b";

describe("re-reselect performance spying", () => {
  beforeEach(() => {
    selectorExample = createCachedSelector(
      (a, _b, _key) => a,
      (_a, b, _key) => b,
      (_resA, _resB) => 100
    )((_a, _b, key) => key);
  });

  it("should find only one combiner calculation", () => {
    selectorExample(1, 2, keyOne);
    selectorExample(1, 2, keyTwo);

    const summary = getPerfSummary();

    expect(summary.mostCalculatedCombiners.length).toEqual(1);
  });

  it("should calculate only once", () => {
    selectorExample(1, 2, keyOne);
    selectorExample(1, 2, keyOne);
    selectorExample(2, 3, keyTwo);
    selectorExample(2, 3, keyTwo);

    const summary = getPerfSummary();

    expect(summary.mostCalculatedCombiners[0].maxCount).toEqual(1);
  });

  it("should calculate three times in each one", () => {
    selectorExample(1, 2, keyOne);
    selectorExample(1, 3, keyOne);
    selectorExample(1, 2, keyOne);

    selectorExample(1, 2, keyTwo);
    selectorExample(1, 3, keyTwo);
    selectorExample(1, 2, keyTwo);

    const summary = getPerfSummary();

    expect(summary.mostCalculatedCombiners[0].maxCount).toEqual(3);
    expect(summary.mostCalculatedCombiners[0].count).toEqual(6);
  });

  it("should find which param caused it to recalculate", () => {
    selectorExample(1, 2, keyOne);
    selectorExample(1, 3, keyOne);
    selectorExample(1, 2, keyOne);

    selectorExample(1, 2, keyTwo);
    selectorExample(1, 3, keyTwo);
    selectorExample(1, 2, keyTwo);

    const summary = getPerfSummary();

    expect(summary.mostCalculatedCombiners[0].args.stats["1"].count).toEqual(4);
  });

  it("let override selector for tests", () => {
    const summarySelector = createCachedSelector(
      (a, _b, _key) => 0,
      (_a, b, _key) => 0,
      (resA, resB) => resA + resB
    )((_a, _b, key) => key);
    const combiner = summarySelector.resultFunc;

    const res = combiner(10, 10);
    expect(res).toEqual(20);
  });

  it("should find its key", () => {
    selectorExample(1, 2, keyOne);

    const summary = getPerfSummary();

    expect(summary.mostCalculatedCombiners[0].key).toEqual(
      "(_resA, _resB) => 100"
    );
    expect(summary.longestSelectors[0].key).toEqual("(_resA, _resB) => 100");
  });
});

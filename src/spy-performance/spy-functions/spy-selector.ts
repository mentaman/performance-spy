import { spyFunctionTime } from "./spy-function-time";

type GenericFunction = (...args: any[]) => any;

let currentSelectorKey: string | null = null;
let currentCacheSelectorKey: string | null = null;

const spySelectorTime = (originalSelectorFunc: GenericFunction) => {
  return function () {
    const combinerFunc = arguments[arguments.length - 1];
    let key = combinerFunc.toString().substr(0, 600);
    if (combinerFunc.name === "resultFuncWithRecomputations") {
      key = currentCacheSelectorKey;
      currentCacheSelectorKey = null;
    }
    currentSelectorKey = key;
    const spiedFunction = originalSelectorFunc(...arguments);
    currentSelectorKey = null;
    return spyFunctionTime(spiedFunction, (summary) => summary.selectorsPerfStat, key);
  };
};

const spySelectorMemoizer = (originalMemoized: GenericFunction) => {
  return function () {
    const key: string | null = currentSelectorKey;
    currentSelectorKey = null;
    if (key !== null) {
      arguments[0] = spyFunctionTime(arguments[0], (summary) => summary.combinerPerfStat, key, { checkArgs: true });
    }
    const spiedFunction = originalMemoized(...arguments);
    return spiedFunction;
  };
};

export const spyCreateSelectorTime = function (originalCreateSelectorFunc: GenericFunction) {
  return (...args: any[]) => {
    args[0] = spySelectorMemoizer(args[0]);
    const spiedFunction = originalCreateSelectorFunc(...args);
    return spySelectorTime(spiedFunction);
  };
};

const spyCachedInnerInnerTime = function (fn: GenericFunction, key: string) {
  return function () {
    currentCacheSelectorKey = key;
    const spiedFunction = fn(...arguments);
    currentCacheSelectorKey = null;
    return spiedFunction;
  };
};

const spyCachedInnerTime = function (fn: GenericFunction, key: string) {
  const spyFunction = function () {
    const spiedFunction = fn(...arguments);
    return spyCachedInnerInnerTime(spiedFunction, key);
  };
  

  Object.defineProperty(spyFunction, "resultFunc", {
    get: function myProperty() {
        return this.resultFunc;
    },
    set: function(value) {
      (fn as any).resultFunc = value;
    }
  });
  spyFunction.__originalSpiedFunction = fn;
  return spyFunction;
};

export const spyCachedCreatorTime = function (selectorFunc: any) {
  const spyFunction = function () {
    const combinerFunc = arguments[arguments.length - 1];

    const key = combinerFunc.toString().substr(0, 500);
    const spiedFunction = selectorFunc(...arguments);
    return spyCachedInnerTime(spiedFunction, key);
  };
  return spyFunction;
};

import { combinerPerfStat, selectorsPerfStat } from "../summary/summaries";
import { spyFunctionTime } from "./spy-function-time";

let currentSelectorKey: string | null = null;
let currentCacheSelectorKey: string | null = null;

const spySelectorTime = (originalSelectorFunc: any) => {
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
    return spyFunctionTime(spiedFunction, selectorsPerfStat, key);
  };
};

const spySelectorMemoizer = (originalMemoized: any) => {
  return function () {
    const key: string | null = currentSelectorKey;
    currentSelectorKey = null;
    if (key !== null) {
      arguments[0] = spyFunctionTime(arguments[0], combinerPerfStat, key, { checkArgs: true });
    }
    const spiedFunction = originalMemoized(...arguments);
    return spiedFunction;
  };
};

export const spyCreateSelectorTime = function (originalCreateSelectorFunc: any) {
  return function () {
    arguments[0] = spySelectorMemoizer(arguments[0]);
    const spiedFunction = originalCreateSelectorFunc(...arguments);
    return spySelectorTime(spiedFunction);
  };
};

const spyCachedInnerInnerTime = function (myfunc: any, key: string) {
  return function () {
    currentCacheSelectorKey = key;
    const spiedFunction = myfunc(...arguments);
    currentCacheSelectorKey = null;
    return spiedFunction;
  };
};
const spyCachedInnerTime = function (myfunc: any, key: string) {
  return function () {
    const spiedFunction = myfunc(...arguments);
    return spyCachedInnerInnerTime(spiedFunction, key);
  };
};

export const spyCachedCreatorTime = function (selectorFunc: any) {
  return function () {
    const combinerFunc = arguments[arguments.length - 1];

    const key = combinerFunc.toString().substr(0, 500);
    const spiedFunction = selectorFunc(...arguments);
    return spyCachedInnerTime(spiedFunction, key);
  };
};

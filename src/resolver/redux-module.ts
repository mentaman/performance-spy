import * as redux from "redux-original";

const _window = typeof window !== "undefined" ? window : null;
export * from "redux-original";
export const combineReducers = _window?.spyReducerCombiner
  ? _window.spyReducerCombiner(redux.combineReducers)
  : redux.combineReducers;


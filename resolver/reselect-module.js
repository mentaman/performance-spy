import * as reselect from "reselect/es";

const _window = typeof window !== "undefined" ? window : null;
export * from "reselect/es";
export const createSelectorCreator = _window?.spyCreateSelectorTime
  ? _window.spyCreateSelectorTime(reselect.createSelectorCreator)
  : reselect.createSelectorCreator;

export const createSelector = _window?.spyCreateSelectorTime
  ? createSelectorCreator(reselect.defaultMemoize)
  : reselect.createSelector;


import * as rereselect from "re-reselect/es";

const _window = typeof window !== "undefined" ? window : null;
export * from "re-reselect/es";
export const createCachedSelector = _window?.spyCreateSelectorTime
  ? _window.spyCachedCreatorTime(rereselect.createCachedSelector)
  : rereselect.createCachedSelector;

export default createCachedSelector;

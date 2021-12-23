
import * as rereselect from "re-reselect-original";

const _window = typeof window !== "undefined" ? window : null;
export * from "re-reselect-original";
export const createCachedSelector = _window?.spyCreateSelectorTime
  ? _window.spyCachedCreatorTime(rereselect.createCachedSelector)
  : rereselect.createCachedSelector;

export default createCachedSelector;

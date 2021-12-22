import { dispatchPerfStat } from "../summary/summaries";
import { spyFunctionTime } from "./spy-function-time";

export const spyThunk = function () {
  function createThunkMiddleware(extraArgument = undefined) {
    return ({ dispatch, getState }: any) =>
      (next: any) =>
      (action: any) => {
        if (typeof action === "function") {
          const key = action.toString().substr(0, 600);
          return spyFunctionTime(action, dispatchPerfStat, key)(dispatch, getState, extraArgument);
        } else if (typeof action === "object" && action.type) {
          return spyFunctionTime(next, dispatchPerfStat, action.type)(action);
        }

        return next(action);
      };
  }

  const thunk: any = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;
  return thunk;
};
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { dispatchPerfStat } from "../summary/summaries";
import { spyFunctionTime } from "./spy-function-time";

export const spyThunk = function () {
  function createThunkMiddleware(extraArgument?: any) {
    const middleware = ({
      dispatch,
      getState
    }: {
      dispatch: ThunkDispatch<any, any, any>;
      getState: () => any
    }) =>
      (next: Dispatch) =>
      (action: any) => {
        if (typeof action === "function") {
          const key = action.toString().substr(0, 600);
          return spyFunctionTime(action, dispatchPerfStat, key)(dispatch, getState, extraArgument);
        } else if (typeof action === "object" && action.type) {
          return spyFunctionTime(next, dispatchPerfStat, action.type)(action);
        }

        return next(action);
      };

    middleware.withExtraArgument = createThunkMiddleware;
    return middleware;
  }

  return createThunkMiddleware();
};
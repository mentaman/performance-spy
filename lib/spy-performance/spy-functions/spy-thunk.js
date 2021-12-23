"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spyThunk = void 0;
const summaries_1 = require("../summary/summaries");
const spy_function_time_1 = require("./spy-function-time");
const spyThunk = function () {
    function createThunkMiddleware(extraArgument = undefined) {
        return ({ dispatch, getState }) => (next) => (action) => {
            if (typeof action === "function") {
                const key = action.toString().substr(0, 600);
                return (0, spy_function_time_1.spyFunctionTime)(action, summaries_1.dispatchPerfStat, key)(dispatch, getState, extraArgument);
            }
            else if (typeof action === "object" && action.type) {
                return (0, spy_function_time_1.spyFunctionTime)(next, summaries_1.dispatchPerfStat, action.type)(action);
            }
            return next(action);
        };
    }
    const thunk = createThunkMiddleware();
    thunk.withExtraArgument = createThunkMiddleware;
    return thunk;
};
exports.spyThunk = spyThunk;

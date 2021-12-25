import { spyFunctionTime } from "./spy-function-time";
import { reducersPerfStat } from "../summary/summaries";
import { PerfStatsStuff } from "../performance-timer";

type GenericFunction = (...args: any[]) => any;

function resultsChecker(_ref: any, res: any, args: IArguments, perfstat: PerfStatsStuff, key: string) {
    const [lastState, action] = args;
    if (res !== lastState) {
      (perfstat.getSubStat(key, "args") as PerfStatsStuff).forwardStat("action_" + action?.type, "count");
    }
  }
  const spyReducers = function (reducers: {[key: string]: GenericFunction}) {
    const spidesReducers: {[key: string]: GenericFunction}  = {};
    Object.keys(reducers).forEach(name => {
      if (typeof reducers[name] === "function") {
        spidesReducers[name] = spyFunctionTime(reducers[name], reducersPerfStat, name, { resultsChecker });
      } else {
        spidesReducers[name] = reducers[name];
      }
    });
    return spidesReducers;
  };

  export const spyReducerCombiner = function (reducerCombiner: GenericFunction) {
    return function (...args: any[]) {
      args[0] = spyReducers(args[0]);
      return reducerCombiner(...args);
    };
  };
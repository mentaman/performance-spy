const { createStore, combineReducers } = require("redux");

let store;
let middlewares;
let initialState;

describe("redux reducers performance spying", () => {
    beforeEach(() => {
        initialState = {
            reducerA: {},
            reducerB: {}
        };

        const reducerA = (state = [], action) => {
            switch (action.type) {
              case 'ACTION_A':
                return {...state, [action.key]: action.value};
              default:
                return state
            }
          }

        const reducerB = (state = [], action) => {
            switch (action.type) {
              case 'ACTION_B':
                return {...state, [action.key]: action.value};
              default:
                return state
            }
        }
        const reducers = {reducerA, reducerB};
        store = createStore(combineReducers(reducers), initialState, middlewares);
        perfStatsReset();
    })

    it("should show changed reducer once", () => {
        store.dispatch({
            type: 'ACTION_A',
            key: 'mykey',
            value: "myvalue"
        });

        const summary = getPerfSummary();
        expect(summary.mostChangedReducers[0].key).toEqual("reducerA");
        expect(summary.mostChangedReducers[0].changedTimes).toEqual(1);
    })

    it("should show changed reducers twice", () => {
        store.dispatch({
            type: 'ACTION_A',
            key: 'mykey',
            value: "myvalue"
        });
        store.dispatch({
            type: 'ACTION_A',
            key: 'mykey',
            value: "othervalue"
        });

        const summary = getPerfSummary();
        expect(summary.mostChangedReducers[0].key).toEqual("reducerA");
        expect(summary.mostChangedReducers[0].changedTimes).toEqual(2);
    })

    it("should show changed reducers only when changed", () => {
        store.dispatch({
            type: 'ACTION_A',
            key: 'mykey',
            value: "myvalue"
        });
        store.dispatch({
            type: 'ACTION_B',
            key: 'mykey',
            value: "othervalue"
        });

        const summary = getPerfSummary();
        expect(summary.mostChangedReducers[0].key).toEqual("reducerA");
        expect(summary.mostChangedReducers[0].changedTimes).toEqual(1);
    })
})
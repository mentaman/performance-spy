import rethunk from "redux-thunk-original";
export * from "redux-thunk-original";
const _window = typeof window !== "undefined" ? window : null;
export default _window?.spyThunk ? _window.spyThunk() : rethunk;

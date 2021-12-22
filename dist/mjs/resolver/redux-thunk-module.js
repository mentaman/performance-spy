import rethunk from "redux-thunk/es";
export * from "redux-thunk/es";
const _window = typeof window !== "undefined" ? window : null;
export default _window?.spyThunk ? _window.spyThunk() : rethunk;

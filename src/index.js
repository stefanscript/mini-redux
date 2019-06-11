let state = {};
let rootReducer;
let listeners = [];

export function createStore(reducer, initState) {
  rootReducer = reducer;
  state = { ...initState };
}

export function getStore() {
  return { ...state };
}

export function dispatch(action) {
  const newState = rootReducer(state, action);
  if (state !== newState) {
    state = newState;
    listeners.map(listener => listener());
  }
}
export function subscribe(listener) {
  if (listener) {
    listeners = [...listeners, listener];
  }
}

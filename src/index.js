let store = {};
let rootReducer;
let listeners = [];

export function createStore(reducer, initState) {
    rootReducer = reducer;
    store = {...initState};
}

export function getStore() {
    return store;
}

export function dispatch(action) {
    const newState = rootReducer(store, action);
    if(store !== newState){
        store = newState;
        listeners.map(listener => listener());
    }
}
export function subscribe(listener) {
    if(listener) {
        listeners = [...listeners, listener];
    }
}
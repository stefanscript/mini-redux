let store = {};

export function createStore(reducer, initState) {
    store = {...initState};
}

export function getStore() {
    return store;
}

export function dispatch() {

}
export function subscribe() {

}
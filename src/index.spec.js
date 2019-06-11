/**
 * @jest-environment node
 */
import { getStore, dispatch, subscribe, createStore } from "./index";

test("it has a store", () => {
  expect(getStore()).toEqual({});
});

test("it can create a store with init state", () => {
  createStore(null, { count: 0 });

  expect(getStore()).toEqual({ count: 0 });
});

test("it can create a store with reducer", () => {
  const reducer = jest.fn();
  createStore(reducer);
  expect(getStore()).toEqual({});
});

test("it can dispatch an action", () => {
  expect(dispatch({ type: "INC" }));
});

test("allows subscribe", () => {
  expect(subscribe());
});

test("given an action is used by the reducer", () => {
  const reducer = jest.fn();
  const action = { type: "INC" };
  createStore(reducer);

  dispatch(action);

  expect(reducer).toHaveBeenCalledWith({}, action);
});

test("reducer calc the next state", () => {
  const reducer = jest.fn(state => ({
    ...state,
    count: state.count + 1
  }));
  const action = { type: "INC" };
  createStore(reducer, { count: 1 });

  dispatch(action);

  expect(getStore()).toEqual({ count: 2 });
});

test("listeners get notified on state change", () => {
  const reducer = jest.fn(state => ({
    ...state,
    count: state.count + 1
  }));
  const action = { type: "INC" };
  const listener1 = jest.fn();
  const listener2 = jest.fn();
  createStore(reducer, { count: 1 });
  subscribe(listener1);
  subscribe(listener2);

  dispatch(action);

  expect(listener1).toHaveBeenCalled();
  expect(listener2).toHaveBeenCalled();
});

test("given no state change listeners dont get notified", () => {
  const reducer = jest.fn(state => state);
  const action = { type: "INC" };
  const listener1 = jest.fn();
  const listener2 = jest.fn();
  createStore(reducer, { count: 1 });
  subscribe(listener1);
  subscribe(listener2);

  dispatch(action);

  expect(listener1).not.toHaveBeenCalled();
  expect(listener2).not.toHaveBeenCalled();
});

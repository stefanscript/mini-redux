/**
 * @jest-environment node
 */
import {getStore, dispatch, subscribe, createStore} from "./index";

test("it has a store", () => {
   expect(getStore()).toEqual({});
});

test("it can create a store with init state", () => {
   createStore(null, {count: 0});

   expect(getStore()).toEqual({count:0});
});

test("it can dispatch an action", () => {
   expect(dispatch({type: "INC"}));
});

test("allows subscribe", () => {
   const subscriber = jest.fn();
   expect(subscribe());
});

import { combineReducers, createStore } from "@reduxjs/toolkit";
import filter from "./slises/filterSlice";
import cart from "./slises/cartSlice";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  combineReducers({
    filter,
    cart,
  }), composeWithDevTools()
);

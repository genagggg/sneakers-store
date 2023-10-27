import { combineReducers, createStore } from "@reduxjs/toolkit";
import filter from "./slises/filterSlice";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  combineReducers({
    filter,
  }), composeWithDevTools()
);

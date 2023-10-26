import { combineReducers, createStore } from "@reduxjs/toolkit";
import filter from "./slises/filterSlice";

export const store = createStore(
  combineReducers({
    filter,
  })
);

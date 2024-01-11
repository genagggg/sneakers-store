import { applyMiddleware, combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import filter from "./slises/filterSlice";
import cart from "./slises/cartSlice";
import { composeWithDevTools } from "redux-devtools-extension";
import pizza from './slises/pizzaSlice';

export const store = configureStore({
  reducer:{
    filter,
    cart,
    pizza,
  }
})

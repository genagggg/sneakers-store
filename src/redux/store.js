import { applyMiddleware, combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import filter from "./slises/filterSlice";
import cart from "./slises/cartSlice";
import { composeWithDevTools } from "redux-devtools-extension";
import pizza from './slises/pizzaSlice';
import {thunk} from 'redux-thunk';

// export const store = createStore(
//   combineReducers({
//     filter,
//     cart,
//     pizza,
//   }),applyMiddleware(thunk), 
// );

export const store = configureStore({
  reducer:{
    filter,
    cart,
    pizza,
  }
})

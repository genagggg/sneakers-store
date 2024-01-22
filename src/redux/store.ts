import { applyMiddleware, combineReducers, configureStore} from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import filter from "./slises/filterSlice";
import cart from "./slises/cartSlice";
import pizza from './slises/pizzaSlice';

const store = configureStore({
  reducer:{
    filter,
    cart,
    pizza,
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store

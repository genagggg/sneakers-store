import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import counterReduser from './slises/filterSlice';

combineReducers({})
export const store = createStore(
    combineReducers({
      counter: counterReduser
    }))
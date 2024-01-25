import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { CartItem } from "./cartSlice";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: Record<string, string>) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<CartItem[]>(
      `https://65279f93931d71583df116d9.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data as CartItem[];
  }
);

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};
interface PizzaSliceState {
  items: Pizza[];
  status: "loading" | "success" | "error";
}

const initialState: PizzaSliceState = {
  items: [],
  status: "loading", //loading|success|error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },

extraReducers: (builder)=>{
  builder.addCase(fetchPizzas.pending,(state, action)=>{
    state.status = "loading";
    state.items = [];
  })

  builder.addCase(fetchPizzas.fulfilled,(state, action)=>{
    state.items = action.payload;
    state.status = "success";
  })

  builder.addCase(fetchPizzas.rejected,(state, action)=>{
    state.status = "error";
    state.items = [];
  })
}

//   extraReducers: {
//     [fetchPizzas.pending]: (state) => {
//       state.status = "loading";
//       state.items = [];
//     },

//     [fetchPizzas.fulfilled]: (state, action) => {
//       state.items = action.payload;
//       state.status = "success";
//     },
//     [fetchPizzas.rejected]: (state, action) => {
//       state.status = "error";
//       state.items = [];
//     },
//   },
// });

export const selectPizzaItems = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",

  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://65279f93931d71583df116d9.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data as Pizza[];
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

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, 
};

export type SearchPizzaParams = {
sortBy: string;
order: string;
category: string;
search: string;
currentPage: string;
}

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

extraReducers: (builder)=>{
  builder.addCase(fetchPizzas.pending,(state)=>{
    state.status = Status.LOADING;
    state.items = [];
  })

  builder.addCase(fetchPizzas.fulfilled,(state, action)=>{
    state.items = action.payload;
    state.status = Status.SUCCESS
  })

  builder.addCase(fetchPizzas.rejected,(state)=>{
    state.status = Status.ERROR;
    state.items = [];
  })
}
});

export const selectPizzaItems = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;

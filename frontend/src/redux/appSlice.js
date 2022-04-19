import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import * as serverApi from "../api/apiClient";

const initialState = {
  funds: 0,
  drinks: {},
  cart: {},
  status: "idle",
};

export const fetchFunds = createAsyncThunk("app/fetchFunds", async () => {
  return await serverApi.fetchFunds();
});

export const addFunds = createAsyncThunk("app/addFunds", async (newFunds) => {
  return await serverApi.addFunds(newFunds);
});

export const fetchDrinks = createAsyncThunk("app/fetchDrinks", async () => {
  return await serverApi.fetchDrinks();
});

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addToCart: (state, { payload: drinkId }) => {
      if (state.cart[drinkId]) {
        state.cart[drinkId]++;
      } else {
        state.cart[drinkId] = 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFunds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFunds.fulfilled, (state, action) => {
        state.funds = action.payload;
        state.status = "done";
      })
      .addCase(addFunds.fulfilled, (state, action) => {
        state.funds = action.payload;
        state.status = "done";
      })
      .addCase(fetchDrinks.fulfilled, (state, action) => {
        state.drinks = action.payload;
        state.status = "done";
      });
  },
});

export const { addToCart } = appSlice.actions;

export const cartTotal = (state) => {
  const { cart, drinks } = state;
  return Object.keys(cart).reduce(
    (t, curr) => t + drinks[curr].cost * cart[curr],
    0
  );
};

export default appSlice.reducer;

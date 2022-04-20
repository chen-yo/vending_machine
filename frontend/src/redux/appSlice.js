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

export const purchase = createAsyncThunk("app/purchase", async (_, thunkApi) => {
  return await serverApi.purchase(thunkApi.getState().cart);
});

export const pullAll = createAsyncThunk("app/pullAll", async () => {
  return await serverApi.pullAll();
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
    reset: (state) => {
      state.cart = {};
      state.status = 'idle'
    }
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
      })
      .addCase(purchase.pending, (state, action) => {
        state.status = "purchase-pending";
      })
      .addCase(purchase.fulfilled, (state, action) => {
        state.funds = action.payload;
        state.cart = {}
        state.status = "purchase-success";
      })
      .addCase(pullAll.fulfilled, (state, action) => {
        state.funds = 0;
        state.cart = {}
      })
  },
});

export const { addToCart, reset } = appSlice.actions;

export const cartTotal = (state) => {
  const { cart, drinks } = state;
  return Object.keys(cart).reduce(
    (t, curr) => t + drinks[curr].cost * cart[curr],
    0
  );
};

export default appSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "../reducers/anecdoteReducer";
import filterReducer from "../reducers/filterReducer";

const Store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
  },
});

export default Store;

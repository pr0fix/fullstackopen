import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      const id = action.payload.id;
      return state.map((anecdote) =>
        anecdote.id === id ? action.payload : anecdote
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdoteObject) => {
  return async (dispatch) => {
    const updatedAnecdote = {
      ...anecdoteObject,
      votes: anecdoteObject.votes + 1,
    };

    await anecdoteService.update(anecdoteObject.id, updatedAnecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;

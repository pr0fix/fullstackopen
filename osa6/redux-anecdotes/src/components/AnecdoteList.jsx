import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  showNotification,
  hideNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    if (state.filter === "ALL") {
      return state.anecdotes;
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(voteAnecdote(id));
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(showNotification(`you voted '${votedAnecdote.content}'`));
    setTimeout(() => dispatch(hideNotification()), 5000);
  };

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;

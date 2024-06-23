import { useMutation } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries("anecdotes");

      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: `Successfully added anecdote '${newAnecdote.content}' to list`,
      });

      setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" });
      }, 5000);
    },
  });

  const onCreate = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

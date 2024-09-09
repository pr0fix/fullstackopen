import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useSubscription } from "@apollo/client";
import Navigation from "./components/Navigation";
import { Route, Routes, useNavigate } from "react-router-dom";
import Recommendation from "./components/Recommendation";
import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS, ALL_GENRES } from "./queries";

const App = () => {
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const navigate = useNavigate();

  // TODO: fix the duplicate n+1 problem
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      client.cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre: "" } },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(addedBook),
          };
        }
      );

      client.refetchQueries({
        include: [{ query: ALL_AUTHORS }, { query: ALL_GENRES }],
      });

      navigate("/");

      setTimeout(() => {
        alert(`${addedBook.title} added successfully`);
      }, 500);
    },
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("library-user-token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <Navigation token={token} logout={logout} />
      <div>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route
            path="/addBook"
            element={token ? <NewBook /> : <LoginForm setToken={setToken} />}
          />
          <Route path="/recommend" element={<Recommendation />}></Route>
          <Route path="/login" element={<LoginForm setToken={setToken} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

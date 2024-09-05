import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import Recommendation from "./components/Recommendation";
import { useSubscription } from "@apollo/client";
import { BOOK_ADDED } from "./queries";
const App = () => {
  const [token, setToken] = useState(null);
  const client = useApolloClient();

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

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      alert(
        `Added book ${data.data.bookAdded.title} by ${data.data.bookAdded.author.name}`
      );
    },
  });

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

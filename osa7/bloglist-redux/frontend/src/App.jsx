import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import ShowNotification from "./components/ShowNotification";
import { initializeBlogs } from "./reducers/blogReducer";
import "./index.css";
import { getUser } from "./reducers/userReducer";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
  }, [dispatch, user]);

  return (
    <>
      <ShowNotification />
      {!user ? (
        <Login />
      ) : (
        <Blogs user={user} />
      )}
    </>
  );
};

export default App;

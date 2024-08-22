import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import ShowNotification from "./components/ShowNotification";
import { initializeBlogs } from "./reducers/blogReducer";
import "./index.css";
import { getUser } from "./reducers/loginReducer";
import { getUsers } from "./reducers/userReducer";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getUsers());
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <>
      <div>
        <ShowNotification />
        {!user ? <Login /> : <Blogs user={user} />}
      </div>
    </>
  );
};

export default App;

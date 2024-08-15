import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navigation = () => {
  const user = useSelector((state) => state.user);

  const padding = {
    padding: 5,
  };
  return (
    <>
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        <p>
          {user.name} logged in <Logout />
        </p>
      </div>
        <h2>blog app</h2>
    </>
  );
};

export default Navigation;

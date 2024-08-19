import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navigation = () => {
  const user = useSelector((state) => state.user);

  const navStyle = {
    backgroundColor: "lightgray",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 0,
    margin: 0,
  };

  return (
    <>
      <div style={navStyle}>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        <p>
          {user.name} logged in <Logout />
        </p>
      </div>
      <h2>blog app</h2>
    </>
  );
};

export default Navigation;

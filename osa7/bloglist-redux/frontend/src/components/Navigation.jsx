import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navigation = () => {
  const user = useSelector((state) => state.user);

  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-lg font-semibold hover:bg-blue-700 px-3 py-2 rounded"
          >
            Blogs
          </Link>
          <Link
            to="/users"
            className="text-lg font-semibold hover:bg-blue-700 px-3 py-2 rounded"
          >
            Users
          </Link>
        </div>
        <h2 className="text-center font-bold text-4xl">Bloglist App</h2>
        <div className="flex items-center space-x-4">
          <p className="text-lg">
            {user.name} logged in <Logout />
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

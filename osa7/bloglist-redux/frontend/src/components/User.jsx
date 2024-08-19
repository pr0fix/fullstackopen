import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  const { userId } = useParams();
  const user = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  );

  if (!user) {
    return null;
  }

  console.log(user);
  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default User;

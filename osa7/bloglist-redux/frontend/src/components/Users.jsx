import { useSelector } from "react-redux";

const Users = () => {
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  return (
    <>
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  {blogs.filter((blog) => blog.user.id === user.id).length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;

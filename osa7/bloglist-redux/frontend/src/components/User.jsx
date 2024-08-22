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

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 rounded-md shadow-md max-w-lg mx-auto">
      <h2 className="font-bold text-4xl mb-4 text-center text-blue-700">
        {user.name}
      </h2>
      <div className="w-full">
        <h3 className="font-bold text-xl mb-2 text-gray-700">Added blogs:</h3>
        <ul className="list-disc list-inside space-y-2 ml-5">
          {user.blogs.map((blog) => (
            <li key={blog.id} className="text-medium text-gray-800">
              {blog.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default User;

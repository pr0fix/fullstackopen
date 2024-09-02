import { useQuery } from "@apollo/client";
import { ALL_BOOKS, GET_USER } from "../queries";
import { useEffect, useState } from "react";

const Recommendation = () => {
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const userResult = useQuery(GET_USER);
  const bookResult = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
  });

  useEffect(() => {
    if (userResult.data) {
      setFavoriteGenre(userResult.data.me.favoriteGenre.name);
    }
  }, [userResult.data]);

  if (bookResult.loading || userResult.loading) {
    return <div>loading...</div>;
  }

  const user = { ...userResult.data.me };
  const books = [...bookResult.data.allBooks];

  return (
    <div>
      <h2>Recommendations</h2>
      <p style={{ fontSize: "18px" }}>
        books in your favorite genre <strong>{user.favoriteGenre.name}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendation;

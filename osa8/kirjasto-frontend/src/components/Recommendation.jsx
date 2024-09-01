import { useQuery } from "@apollo/client";
import { ALL_BOOKS, GET_USER } from "../queries";

const Recommendation = () => {
  const result = useQuery(ALL_BOOKS);
  const resultUser = useQuery(GET_USER);

  if (result.loading || resultUser.loading) {
    return <div>loading...</div>;
  }

  const favoriteGenre = resultUser.data.me.favoriteGenre;

  const books = result.data.allBooks;
  const recommendations = books.filter((book) =>
    book.genres.includes(favoriteGenre)
  );

  return (
    <div>
      <h2>Recommendations</h2>
      <p style={{fontSize: "18px"}}>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendations.map((book) => (
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

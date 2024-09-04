import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import { useState } from "react";

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const bookResult = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre || "" },
  });
  const genreResult = useQuery(ALL_GENRES);

  if (bookResult.loading || genreResult.loading) {
    return <div>loading...</div>;
  }

  const books = [...bookResult.data.allBooks];
  const genres = [...genreResult.data.allGenres];

  return (
    <div>
      <h2>Books</h2>

      {selectedGenre ? (
        <p style={{ fontSize: "18px" }}>
          in genre <strong>{selectedGenre}</strong>
        </p>
      ) : null}

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

      <div>
        {genres.map((genre) => (
          <button key={genre.name} onClick={() => setSelectedGenre(genre.name)}>
            {genre.name}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;

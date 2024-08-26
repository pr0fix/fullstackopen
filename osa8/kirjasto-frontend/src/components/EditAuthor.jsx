import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Select from "react-select";

const EditAuthor = () => {
  const result = useQuery(ALL_AUTHORS);

  const [name, setName] = useState(null);
  const [year, setYear] = useState("");

  const [editBirthyear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const options = result.data.allAuthors.map((a) => ({
    value: a.name,
    label: a.name,
  }));

  const submit = async (event) => {
    event.preventDefault();
    const born = parseInt(year);

    editBirthyear({ variables: { name: name.value, born: born } });

    setName("");
    setYear("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select defaultValue={name} onChange={setName} options={options} />
        <div>
          born{" "}
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default EditAuthor;

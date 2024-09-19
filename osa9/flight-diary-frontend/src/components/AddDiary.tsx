import { useState } from "react";
import { createDiary } from "../services/diaryService";
import { Diary, NewDiary } from "../types";

interface AddDiaryProps {
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const AddDiary: React.FC<AddDiaryProps> = ({ setDiaries }) => {
  const [newDiary, setNewDiary] = useState<NewDiary>({
    date: "",
    visibility: "",
    weather: "",
    comment: "",
  });
  const [notification, setNotification] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiary({
      ...newDiary,
      [e.target.name]: e.target.value,
    });
  };

  const addDiary = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const result = await createDiary(newDiary);
      if (typeof result === "string") {
        setNotification(result);
      } else {
        setDiaries((prevDiaries) => [...prevDiaries, result]);
        setNotification(null);
      }
    } catch (error) {
      console.error("Failed to add diary", error);
      setNotification("An unexpected error occurred. Please try again.");
    }
    setNewDiary({
      date: "",
      visibility: "",
      weather: "",
      comment: "",
    });
  };

  return (
    <>
      <h2>Add new entry</h2>
      {notification && <div style={{ color: "red" }}>{notification}</div>}
      <form onSubmit={addDiary}>
        <div style={{ display: "flex", flexDirection: "column", width: 200 }}>
          <label htmlFor="date">date</label>
          <input
            type="text"
            name="date"
            id="date"
            value={newDiary.date}
            onChange={handleInputChange}
          />

          <label htmlFor="visibility">visibility</label>
          <input
            type="text"
            name="visibility"
            id="visibility"
            value={newDiary.visibility}
            onChange={handleInputChange}
          />

          <label htmlFor="weather">weather</label>
          <input
            type="text"
            name="weather"
            id="weather"
            value={newDiary.weather}
            onChange={handleInputChange}
          />

          <label htmlFor="comment">comment</label>
          <input
            type="text"
            name="comment"
            id="comment"
            value={newDiary.comment}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default AddDiary;

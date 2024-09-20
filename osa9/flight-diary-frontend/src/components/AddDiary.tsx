import { useState } from "react";
import { createDiary } from "../services/diaryService";
import { Diary, NewDiary, Visibility, Weather } from "../types";

interface AddDiaryProps {
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const AddDiary: React.FC<AddDiaryProps> = ({ setDiaries }) => {
  const [newDiary, setNewDiary] = useState<NewDiary>({
    date: "",
    visibility: "" as Visibility,
    weather: "" as Weather,
    comment: "",
  });
  const [notification, setNotification] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDiary({
      ...newDiary,
      [e.target.name]: e.target.value,
    });
  };

  const addDiary = async (e: React.FormEvent<HTMLFormElement>) => {
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
      visibility: "" as Visibility,
      weather: "" as Weather,
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
            type="date"
            name="date"
            id="date"
            value={newDiary.date}
            onChange={handleInputChange}
          />

          <label>visibility</label>
          <div>
            <label>
              <input
                type="radio"
                name="visibility"
                value="great"
                checked={newDiary.visibility === "great"}
                onChange={handleInputChange}
              />
              great
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="good"
                checked={newDiary.visibility === "good"}
                onChange={handleInputChange}
              />
              good
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="ok"
                checked={newDiary.visibility === "ok"}
                onChange={handleInputChange}
              />
              ok
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="poor"
                checked={newDiary.visibility === "poor"}
                onChange={handleInputChange}
              />
              poor
            </label>
          </div>

          <label>weather</label>
          <div>
            <label>
              <input
                type="radio"
                name="weather"
                value="sunny"
                checked={newDiary.weather === "sunny"}
                onChange={handleInputChange}
              />
              sunny
            </label>
            <label>
              <input
                type="radio"
                name="weather"
                value="rainy"
                checked={newDiary.weather === "rainy"}
                onChange={handleInputChange}
              />
              rainy
            </label>
            <label>
              <input
                type="radio"
                name="weather"
                value="cloudy"
                checked={newDiary.weather === "cloudy"}
                onChange={handleInputChange}
              />
              cloudy
            </label>
            <label>
              <input
                type="radio"
                name="weather"
                value="stormy"
                checked={newDiary.weather === "stormy"}
                onChange={handleInputChange}
              />
              stormy
            </label>
            <label>
              <input
                type="radio"
                name="weather"
                value="windy"
                checked={newDiary.weather === "windy"}
                onChange={handleInputChange}
              />
              windy
            </label>
          </div>

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

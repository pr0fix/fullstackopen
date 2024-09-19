import { useEffect, useState } from "react";
import { Diary } from "../types";
import { getAllDiaries } from "../services/diaryService";
import AddDiary from "./AddDiary";

const Diaries = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <>
      <AddDiary setDiaries={setDiaries} />
      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <b>{diary.date}</b>
          <br />
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </>
  );
};

export default Diaries;

import axios from "axios";
import { Diary } from "../types";
const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = async (): Promise<Diary[]> => {
  try {
    const res = await axios.get<Diary[]>(baseUrl);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch diaries", error);
    return [];
  }
};

// export const createDiary = async (object: Diary) => {};

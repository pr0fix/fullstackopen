import axios from "axios";
import { Diary, NewDiary } from "../types";
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

export const createDiary = async (
  object: NewDiary
): Promise<Diary | string> => {
  try {
    const res = await axios.post<Diary>(baseUrl, object);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return (
        error.response?.data ||
        "Failed to add new diary"
      );
    } else {
      return "Failed to add new diary due to an unexpected error.";
    }
  }
};

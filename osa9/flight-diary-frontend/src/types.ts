export type Visibility = "great" | "good" | "ok" | "poor";

export type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy";

export interface Diary {
  id: number;
  date: string;
  visibility: Visibility;
  weather: Weather;
  comment: string;
}

export type NewDiary = Omit<Diary, "id">;

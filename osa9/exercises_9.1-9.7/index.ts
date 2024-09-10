import express from "express";
import calculateBmi from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  let weight = Number(req.query.weight);
  let height = Number(req.query.height);
  let bmi = calculateBmi(height, weight);
  res.json({ weight, height, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

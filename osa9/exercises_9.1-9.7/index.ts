import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (weight <= 0 || height <= 0 || isNaN(weight) || isNaN(height)) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  const bmi = calculateBmi(height, weight);
  res.json({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (typeof target === "undefined" || typeof daily_exercises === "undefined") {
    return res.status(400).send({ error: "parameters missing" });
  }
  const targetNumber = Number(target);
  if (isNaN(targetNumber) || targetNumber <= 0) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  if (
    !daily_exercises ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((e) => isNaN(Number(e)))
  ) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const hours: number[] = daily_exercises.map(Number);

  const result = calculateExercises(targetNumber, hours);
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

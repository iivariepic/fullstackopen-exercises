import express from 'express';
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator"
import { arePositiveNumbers } from "./utils";

const app = express();
app.use(express.json())

app.get('/hello', (_, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || !arePositiveNumbers([height as string, weight as string])) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

  return res.status(200).json({
    weight,
    height,
    bmi: calculateBmi(Number(height), Number(weight))
  });
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body
  if (!daily_exercises || ! target) {
    return res.status(400).json({
      error: "parameters missing"
    });
  }
  if (!arePositiveNumbers([...daily_exercises, target])) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }
  return res.json(calculateExercises(daily_exercises, target))
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
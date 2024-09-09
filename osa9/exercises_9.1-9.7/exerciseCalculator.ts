interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((day) => day > 0).length;

  if (periodLength === 0) {
    return {
      periodLength,
      trainingDays,
      success: false,
      rating: 1,
      ratingDescription: "No training data available",
      target,
      average: 0,
    };
  }

  let totalHours = 0;
  for (const hour of hours) {
    totalHours += hour;
  }
  const average = totalHours / periodLength;

  let rating = 1;
  let ratingDescription = "You haven't reached your target";

  if (average >= target) {
    rating = 3;
    ratingDescription = "You've trained excellently";
  } else if (average >= target * 0.8) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  }

  const success = average >= target;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

export default calculateExercises;

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (): Result => {
  const args = process.argv.slice(2);
  if (args.length < 2) throw new Error("Not enough arguments");
  const target: number = Number(args[0]);

  if (isNaN(target)) {
    throw new Error("Target must be a number!");
  }

  const hours: number[] = args.slice(1).map((arg) => {
    const num = Number(arg);
    if (isNaN(num)) {
      throw new Error("All exercise hours must be numbers!");
    }
    return num;
  });

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
console.log(calculateExercises())

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

export default calculateExercises;

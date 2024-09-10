const calculateBmi = (height: number, weight: number): string => {
  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
  }

  if (height <= 0 || weight <= 0) {
    throw new Error("Provided values were too low.");
  }

  const bmi = weight / ((height / 100) * (height / 100));

  if (bmi <= 18.4) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25.0) {
    return "Normal range";
  } else if (bmi >= 25.0 && bmi < 30.0) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) throw new Error("Not enough arguments");
  if (args.length > 2) throw new Error("Too many arguments");
  const height = Number(args[0]);
  const weight = Number(args[1]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
  }

  if (height <= 0 || weight <= 0) {
    throw new Error("Height and weight must be positive numbers!");
  }
  console.log(calculateBmi(height, weight));
}

export default calculateBmi;

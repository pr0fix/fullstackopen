const calculateBmi = (height: number, weight: number): string => {

    if (height <= 0 ||weight <= 0) {
        throw new Error("Height and weight must be positive numbers!")
    }

    const bmi = weight / ((height / 100) * (height / 100));

    if (bmi <= 18.4) {
        return "Underweight"
    } else if(bmi >= 18.5 && bmi < 25.0) {
        return "Normal range"
    } else if (bmi >= 25.0 && bmi < 30.0) {
        return "Overweight"
    }  else {
        return "Obese"
    }

}

console.log(calculateBmi(180, 74))

export default calculateBmi
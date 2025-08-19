const calculateBmi = (heightInCm: number, weightInKg: number) => {
  const bmi = weightInKg / ((heightInCm / 100) ** 2)
  if (bmi < 18.5) return "Underweight"
  if (bmi < 25) return "Normal Range"
  if (bmi < 30) return "Overweight"
  return "Obese"
}

console.log(calculateBmi(180, 74))
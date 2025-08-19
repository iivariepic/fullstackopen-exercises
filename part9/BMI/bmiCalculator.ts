import { arePositiveNumbers } from "./utils";

interface BmiValues {
  heightInCm: number
  weightInKg: number
}

const calculateBmi = (heightInCm: number, weightInKg: number) => {
  const bmi = weightInKg / ((heightInCm / 100) ** 2)
  if (bmi < 18.5) return "Underweight"
  if (bmi < 25) return "Normal Range"
  if (bmi < 30) return "Overweight"
  return "Obese"
}

const ARGUMENT_AMOUNT = 4
const parseArguments = (args: string[]): BmiValues => {
  if (args.length !== ARGUMENT_AMOUNT) throw new Error(`Wrong number of extra arguments: ${ARGUMENT_AMOUNT - 2} needed, ${args.length - 2} given`)

  if (arePositiveNumbers([args[2], args[3]])) {
    return {
      heightInCm: Number(args[2]),
      weightInKg: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not positive numbers!')
  }
}

if (require.main === module) {
  try {
    const { heightInCm , weightInKg } = parseArguments(process.argv)
    console.log(calculateBmi(heightInCm, weightInKg))
  } catch (error) {
    console.error(error)
  }
}

export default calculateBmi
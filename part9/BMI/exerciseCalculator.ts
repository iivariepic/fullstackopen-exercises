import { arePositiveNumbers } from "./utils"

interface CalculatorValues {
  exerciseHours: number[]
  target: number
}

interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const getRating = (target: number, average: number): { rating: number, description: string } => {
  if (target - average > target / 2) return { rating: 1, description: "Try harder next time!" }
  if (target - average > 0) return { rating: 2, description: "Almost there! Try to hit the target next time!" }
  return { rating: 3, description: "Well done! You hit your target" }
}

const calculateExercises = (dailyExerciseHours: number[], targetHourAverage: number): ExerciseResult => {
  const periodLength = dailyExerciseHours.length
  const average = periodLength > 0
    ? dailyExerciseHours.reduce((prev, current) => prev + current, 0) / periodLength
    : 0

  const rating = getRating(targetHourAverage, average)

  return {
    periodLength,
    trainingDays: dailyExerciseHours.filter(dayHours => dayHours !== 0).length,
    success: average >= targetHourAverage,
    rating: rating.rating,
    ratingDescription: rating.description,
    target: targetHourAverage,
    average,
  }
}

const ARGUMENT_MINIMUM = 4
const parseArguments = (args: string[]): CalculatorValues => {
  if (args.length < ARGUMENT_MINIMUM) throw new Error(`Too few extra arguments: at least ${ARGUMENT_MINIMUM - 2} needed, ${args.length - 2} given`)

  if (arePositiveNumbers(args.slice(2))) {
    return {
      exerciseHours: args.slice(3).map(argument => Number(argument)),
      target: Number(args[2])
    }
  } else {
    throw new Error('Provided values were not positive numbers!')
  }
}

try {
  const { exerciseHours, target } = parseArguments(process.argv)
  console.log(calculateExercises(exerciseHours, target))
} catch (error) {
  console.error(error)
}
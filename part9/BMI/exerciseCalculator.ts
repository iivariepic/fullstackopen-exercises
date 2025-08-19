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
    ? dailyExerciseHours.reduce((prev, current) => prev + current) / periodLength
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
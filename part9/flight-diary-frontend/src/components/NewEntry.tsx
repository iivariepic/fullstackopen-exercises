import { isAxiosError } from "axios"
import React, { useState } from "react"
import { createDiaryEntry } from "../services/diary.ts"
import { type DiaryEntry, Visibility, Weather } from "../types.ts"
import { handleAxiosError } from "../utils.ts"

interface Props {
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
  setError: (message: string, duration?: number) => void
}

const NewEntry = ({ setEntries, setError }: Props) => {
  const [date, setDate] = useState<string>('')
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [weather, setWeather] = useState<Weather>(Weather.Sunny)
  const [comment, setComment] = useState<string>('')

  const onSubmit = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault()
      const newEntry = await createDiaryEntry({
        date,
        visibility,
        weather,
        comment
      })
      setEntries(prev => ([...prev, newEntry]))
      setDate('')
      setVisibility(Visibility.Great)
      setWeather(Weather.Sunny)
      setComment('')
    } catch (error) {
      if (isAxiosError(error)) {
        setError(handleAxiosError(error))
        return
      }
      setError(`Unexpected Error Occurred: ${error}`)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Add New Entry</h2>
      <div>
        <span>date</span>
        <input
          value={date}
          type="date"
          onChange={(event) => setDate(event.target.value)}
        />
      </div>

      <div>
        <span>visibility </span>
        {Object.values(Visibility).map((value) => (
          <span key={value}>
            <input
              type="radio"
              id={`vis-${value}`}
              name="visibility"
              value={value}
              checked={visibility === value}
              onChange={() => setVisibility(value)}
            />
            <label htmlFor={`vis-${value}`}>{value}</label>
          </span>
        ))}
      </div>

      <div>
        <span>weather </span>
        {Object.values(Weather).map((value) => (
          <span key={value}>
            <input
              type="radio"
              id={`weather-${value}`}
              name="weather"
              value={value}
              checked={weather === value}
              onChange={() => setWeather(value)}
            />
            <label htmlFor={`weather-${value}`}>{value}</label>
          </span>
        ))}
      </div>

      <div>
        <span>comment</span>
        <input value={comment} onChange={(event) => setComment(event.target.value)}/>
      </div>

      <button type="submit">add</button>
    </form>
  )
}

export default NewEntry
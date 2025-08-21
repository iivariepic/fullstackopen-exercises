import { isAxiosError } from "axios"
import { useEffect, useState } from "react"
import DiaryEntries from "./components/DiaryEntries.tsx"
import NewEntry from "./components/NewEntry.tsx"
import { getAllDiaryEntries } from "./services/diary"
import type { DiaryEntry } from "./types.ts"
import { handleAxiosError } from "./utils.ts"

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllDiaryEntries()
        setEntries(data)
      } catch (error) {
        if (isAxiosError(error)) {
          setError(handleAxiosError(error))
          return
        }
        setError(`Unexpected Error Occurred: ${error}`)
      }
    }

    fetchData()
  }, []);

  const setError = (message: string, duration = 5000) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(''), duration)
  }

  return (
    <div>
      {errorMessage !== '' && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <NewEntry setEntries={setEntries} setError={setError}/>
      <DiaryEntries entries={entries}/>
    </div>
  )
}

export default App

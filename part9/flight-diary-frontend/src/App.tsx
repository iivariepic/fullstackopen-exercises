import { useEffect, useState } from "react"
import DiaryEntries from "./components/DiaryEntries.tsx"
import { getAllDiaryEntries } from "./services/diary"
import type { DiaryEntry } from "./types.ts"

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllDiaryEntries()
      if (data) setEntries(data)
    }

    fetchData()
  }, []);

  return (
    <div>
      <DiaryEntries entries={entries}/>
    </div>
  )
}

export default App

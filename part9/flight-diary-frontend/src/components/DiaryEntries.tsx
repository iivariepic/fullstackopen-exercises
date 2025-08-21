import type { DiaryEntry } from "../types.ts"

interface Props {
  entries: DiaryEntry[]
}

const DiaryEntry = ({ entry }: { entry: DiaryEntry }) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <div>visibility: {entry.visibility}</div>
      <div>weather: {entry.weather}</div>
    </div>
  )
}

const DiaryEntries = ({ entries }: Props) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      {entries.map(
        (entry, index) => <DiaryEntry entry={entry} key={index}/>
      )}
    </div>
  )
}


export default DiaryEntries
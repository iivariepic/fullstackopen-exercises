import React, { useEffect, useState } from "react"
import { Typography, Box } from "@mui/material"
import { Diagnosis, Entry } from "../../types.ts"
import PatientTable from "./PatientTable.tsx"
import diagnosisService from "../../services/diagnoses";

interface Props {
  entries: Entry[]
}

const EntryTable = ({ entry }: { entry: Entry }) => {
  const tableTitles = ["Date", "Description"]
  const tableData: (string | React.ReactNode)[] = [entry.date, entry.description]
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const allDiagnoses = await diagnosisService.getAll()
      setDiagnoses(allDiagnoses)
    }
    fetchDiagnoses()
  }, [])

  const diagnosesMap = Object.fromEntries(diagnoses.map(d => [d.code, d]))

  if (entry.diagnosisCodes) {
    tableTitles.push("Diagnosis Codes")
    tableData.push(
      <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
        {entry.diagnosisCodes.map(code => (
          <li key={code}>
            <b>{code}</b>: {diagnosesMap[code]?.name || ""}
          </li>
        ))}
      </ul>
    )
  }
  return (
    <PatientTable
      tableTitles={tableTitles}
      tableData={tableData}
    />
  )
}

const EntriesList = ({ entries }: Props) => {
  return (
    <Box mt={4}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "normal"
        }}
        align="center"
      >
        Entries
      </Typography>
      {entries.map(entry => <EntryTable entry={entry} />)}
      {entries.length === 0 &&
        <Typography
          sx={{
            mt: 3
          }}
          align="center">No Entries Found.
        </Typography>
      }
    </Box>
  )
}

export default EntriesList
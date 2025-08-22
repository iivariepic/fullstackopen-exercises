import React from "react"
import { Typography, Box } from "@mui/material"
import { Entry } from "../../types.ts"
import PatientTable from "./PatientTable.tsx"

interface Props {
  entries: Entry[]
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
      {entries.map(entry => {
        const tableTitles = ["Date", "Description"]
        const tableData: (string | React.ReactNode)[] = [entry.date, entry.description]
        if (entry.diagnosisCodes) {
          tableTitles.push("Diagnosis Codes")
          tableData.push(
            <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
              {entry.diagnosisCodes.map(code => (
                <li key={code}>{code}</li>
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
      })}
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
import { Typography, Box } from "@mui/material"
import { Diagnosis, Entry } from "../../types.ts";
import EntryTable from "./EntryTable.tsx"

interface Props {
  entries: Entry[]
  diagnoses: Diagnosis[]
}

const EntriesList = ({ entries, diagnoses }: Props) => {
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
      {entries.map(entry =>
        <EntryTable entry={entry} key={entry.id} diagnoses={diagnoses}/>)
      }
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
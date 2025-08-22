import { Typography, Box } from "@mui/material"
import { Entry } from "../../types.ts";
import EntryTable from "./EntryTable.tsx"

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
      {entries.map(entry => <EntryTable entry={entry} key={entry.id}/>)}
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
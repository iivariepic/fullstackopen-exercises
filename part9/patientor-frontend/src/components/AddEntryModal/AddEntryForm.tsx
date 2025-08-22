import { Box, Button } from "@mui/material"
import { useState } from "react"
import { EntryFormValues, EntryTypes } from "../../types.ts"

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const entryTypeOptions = Object.values(EntryTypes)

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [selectedEntryType, setSelectedEntryType] = useState<EntryTypes>(EntryTypes.HealthCheck)
  console.log(onCancel)
  console.log(onSubmit)

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={1}
      mt={2}
    >
      {entryTypeOptions.map(
        option =>
          option === selectedEntryType
            ? <Button
                variant="contained"
                onClick={() => setSelectedEntryType(option)}
              >
                {option}
              </Button>
            : <Button
                onClick={() => setSelectedEntryType(option)}
              >
                {option}
              </Button>
      )}
    </Box>
  )
}

export default AddEntryForm
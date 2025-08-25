import { Box, Button, TextField } from "@mui/material"
import React, { useState } from "react"
import { EntryFormValues, Discharge } from "../../../types.ts"
import { BaseData } from "../AddEntryForm.tsx"

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  baseData: BaseData
}

const today = new Date().toISOString().split("T")[0];

const HospitalForm = ({ onSubmit, onCancel, baseData }: Props) => {
  const [discharge, setDischarge] = useState<Discharge>({
    date: today,
    criteria: ""
  })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({...baseData, discharge, type: "Hospital"})
        onCancel()
      }}
    >
      <TextField
        label="Discharge Criteria"
        fullWidth
        value={discharge.criteria}
        onChange={
          ({ target }) => setDischarge(prev => ({...prev, criteria: target.value}))
        }
        sx={{
          mb: 2
        }}
      />
      <TextField
        label="Discharge Date"
        type="date"
        fullWidth
        value={discharge.date}
        onChange={
          ({ target }) => setDischarge(prev => ({...prev, date: target.value}))
        }
        InputLabelProps={{
          shrink: true
        }}
        sx={{
          mb: 2
        }}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
        mb={5}
      >
        <Button
          onClick={() => onCancel()}
          color="secondary"
          variant="contained"
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained">Submit</Button>
      </Box>
    </form>
  )
}

export default HospitalForm
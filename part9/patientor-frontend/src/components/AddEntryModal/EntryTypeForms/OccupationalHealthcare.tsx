import { Box, Button, Checkbox, InputLabel, TextField } from "@mui/material"
import React, { useState } from "react"
import { EntryFormValues, SickLeave } from "../../../types.ts"
import { BaseData } from "../AddEntryForm.tsx"

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  baseData: BaseData
}

const today = new Date().toISOString().split("T")[0];

const OccupationalHealthcareForm = ({ onSubmit, onCancel, baseData }: Props) => {
  const [sickLeave, setSickLeave] = useState<SickLeave | undefined>()
  const [openSickLeave, setOpenSickLeave] = useState<boolean>(false)
  const [employerName, setEmployerName] = useState<string>("")

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({...baseData, employerName, sickLeave, type: "OccupationalHealthcare"})
        onCancel()
      }}
    >
      <TextField
        label="Employer Name"
        fullWidth
        value={employerName}
        onChange={
          ({ target }) => setEmployerName(target.value)
        }
        sx={{
          mb: 2
        }}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <InputLabel>Got sick leave?</InputLabel>
        <Checkbox
          checked={openSickLeave}
          onClick={
          () => {
            if (openSickLeave) {
              setSickLeave(undefined);
            } else {
              setSickLeave({ startDate: today, endDate: today });
            }
            setOpenSickLeave(prev => !prev)
          }
        }/>
      </Box>
      {openSickLeave &&
        <Box>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={sickLeave?.startDate ?? today}
            onChange={
              ({ target }) => setSickLeave(prev => ({...prev, startDate: target.value}))
            }
            InputLabelProps={{
              shrink: true
            }}
            sx={{
              mb: 2
            }}
          />
          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={sickLeave?.endDate ?? today}
            onChange={
              ({ target }) => setSickLeave(prev => ({...prev, endDate: target.value}))
            }
            InputLabelProps={{
              shrink: true
            }}
            sx={{
              mb: 2
            }}
          />
        </Box>
      }
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

export default OccupationalHealthcareForm
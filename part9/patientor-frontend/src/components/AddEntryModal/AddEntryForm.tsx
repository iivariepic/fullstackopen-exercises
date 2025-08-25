import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText
} from "@mui/material";
import { useState } from "react"
import { BaseEntry, Diagnosis, EntryFormValues, EntryTypes } from "../../types.ts"
import HealthCheckForm from "./EntryTypeForms/HealthCheck.tsx"

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[]
}

export type BaseData = Omit<BaseEntry, "id">;

const entryTypeOptions = Object.values(EntryTypes)
const styleOptionText = (text: string) => {
  if (text === "HealthCheck") return "Health Checkup"
  if (text === "OccupationalHealthcare") return "Occupational Healthcare"
  return text
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [selectedEntryType, setSelectedEntryType] = useState<EntryTypes>(EntryTypes.HealthCheck)
  const [baseData, setBaseData] = useState<BaseData>({
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
  })

  const setBaseDataField = <K extends keyof BaseData>(
    field: K,
    value: BaseData[K]
  ) => {
    setBaseData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }


  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
        mt={2}
        mb={5}
      >
        {entryTypeOptions.map(
          option =>
            option === selectedEntryType
              ? <Button
                variant="contained"
                onClick={() => setSelectedEntryType(option)}
              >
                {styleOptionText(option)}
              </Button>
              : <Button
                onClick={() => setSelectedEntryType(option)}
              >
                {styleOptionText(option)}
              </Button>
        )}
      </Box>
      <Box>
        <TextField
          label="Description"
          fullWidth
          value={baseData.description}
          onChange={
          ({ target }) =>
            setBaseDataField("description", target.value)
          }
          sx={{
            mb: 2
          }}
        />

        <TextField
          label="Date"
          type="date"
          fullWidth
          value={baseData.date}
          onChange={
            ({ target }) =>
              setBaseDataField("date", target.value)
          }
          InputLabelProps={{
            shrink: true
          }}
          sx={{
            mb: 2
          }}
        />

        <TextField
          label="Specialist"
          fullWidth
          value={baseData.specialist}
          onChange={
            ({ target }) =>
              setBaseDataField("specialist", target.value)
          }
          sx={{
            mb: 2
          }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            multiple
            value={baseData.diagnosisCodes}
            onChange={(event) =>
              setBaseDataField(
                "diagnosisCodes",
                event.target.value as string[]
              )
            }
            renderValue={(selected) => (selected as string[]).join(", ")}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                <Checkbox
                  checked={baseData.diagnosisCodes?.includes(diagnosis.code) || false}
                />
                <ListItemText
                  primary={`${diagnosis.code} — ${diagnosis.name}`}
                  secondary={diagnosis.latin}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedEntryType === "HealthCheck" &&
          <HealthCheckForm
            onSubmit={onSubmit}
            onCancel={onCancel}
            baseData={baseData}
          />
        }
      </Box>
    </Box>
  )
}

export default AddEntryForm
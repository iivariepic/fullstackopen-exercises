import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Button, IconButton, InputLabel } from "@mui/material"
import React, { useEffect, useState } from "react"
import { EntryFormValues, HealthCheckRating } from "../../../types.ts"
import { BaseData } from "../AddEntryForm.tsx"

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  baseData: BaseData
}

const HealthCheckForm = ({ onSubmit, onCancel, baseData }: Props) => {
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy)
  const [hearts, setHearts] = useState<React.ReactNode[]>([])

  useEffect(() => {
    const newHearts: typeof hearts = []

    for (let i = 0; i < 4; i++) {
      if (i < 4 - healthCheckRating) {
        newHearts.push(
          <IconButton key={i} onClick={() => setHealthCheckRating(3 - i)}>
            <FavoriteIcon sx={{ color: '#7B1818', fontSize: 36 }} />
          </IconButton>
        )
      } else {
        newHearts.push(
          <IconButton key={i} onClick={() => setHealthCheckRating(3 - i)}>
            <FavoriteBorderIcon sx={{ fontSize: 36 }} />
          </IconButton>
        )
      }
    }
    setHearts(newHearts)
  }, [healthCheckRating]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({...baseData, healthCheckRating, type: "HealthCheck"})
        onCancel()
      }
    }>
      <InputLabel>Health Rating</InputLabel>
      {hearts}
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

export default HealthCheckForm
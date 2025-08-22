import FemaleIcon from "@mui/icons-material/Female"
import MaleIcon from "@mui/icons-material/Male"
import TransgenderIcon from "@mui/icons-material/Transgender"
import { Box, Typography } from "@mui/material"
import { Patient } from "../../types.ts"

interface Props {
  patient : Patient
}

const PatientHeader = ({ patient }: Props) => {
  const getGenderIcon = (gender: string) => {
    if (gender.toLowerCase() == "male") return <MaleIcon />
    if (gender.toLowerCase() == "female") return <FemaleIcon />
    return <TransgenderIcon />
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={1}
      mt={2}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "large"
        }}
      >
        {patient.name}
      </Typography>
      {getGenderIcon(patient.gender)}
    </Box>
  )
}

export default PatientHeader
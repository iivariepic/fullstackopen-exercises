import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Patient } from "../../types.ts"
import patientService from "../../services/patients";
import PatientTable from "./PatientTable.tsx"
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientPage = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patient, setPatient] = useState<Patient | null>(null)

  useEffect(() => {
    const fetchPatient = async () => {
      const patientData = await patientService.getById(patientId || "")
      if (patientData) setPatient(patientData)
      else setPatient(null)
    }

    fetchPatient()
  }, [patientId]);

  const getGenderIcon = (gender: string) => {
    if (gender.toLowerCase() == "male") return <MaleIcon />
    if (gender.toLowerCase() == "female") return <FemaleIcon />
    return <TransgenderIcon />
  }

  return (
    <Box>
      <Typography align="center" variant="h6">
        Patient Information
      </Typography>
      {patient
        ? (
          <Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
              mt={2}
              mb={2}
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
            <PatientTable patient={patient} />
          </Box>)
        : <Typography>No patient found!</Typography>
      }
    </Box>
  )
}

export default PatientPage
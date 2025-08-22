import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Patient } from "../../types.ts"
import patientService from "../../services/patients";
import AddEntryModal from "../AddEntryModal"
import EntriesList from "./EntriesList.tsx"
import PatientHeader from "./PatientHeader.tsx"
import PatientTable from "./PatientTable.tsx"

const PatientPage = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patient, setPatient] = useState<Patient | null>(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      const patientData = await patientService.getById(patientId || "")
      if (patientData) setPatient(patientData)
      else setPatient(null)
    }

    fetchPatient()
  }, [patientId]);

  return (
    <Box>
      <Typography align="center" variant="h6">
        Patient Information
      </Typography>
      {patient
        ? (
          <Box>
            <PatientHeader patient={patient} />
            <PatientTable
              tableTitles={["Date Of Birth", "SSN", "Occupation"]}
              tableData={[patient.dateOfBirth, patient.ssn, patient.occupation]}
            />
            <EntriesList entries={patient.entries}/>
            <AddEntryModal modalOpen={modalOpen} onClose={closeModal} onSubmit={() => {}} />
            <Button variant="contained" onClick={() => openModal()}>
              Add New Entry
            </Button>
          </Box>)
        : <Typography>No patient found!</Typography>
      }
    </Box>
  )
}

export default PatientPage
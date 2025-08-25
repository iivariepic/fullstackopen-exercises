import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import diagnosisService from "../../services/diagnoses.ts"
import { Diagnosis, EntryFormValues, Patient } from "../../types.ts"
import patientService from "../../services/patients";
import AddEntryModal from "../AddEntryModal"
import EntriesList from "./EntriesList.tsx"
import PatientHeader from "./PatientHeader.tsx"
import PatientTable from "./PatientTable.tsx"

const PatientPage = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patient, setPatient] = useState<Patient | null>(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const createEntry = async (values: EntryFormValues) => {
    try {
      const newEntry = await patientService.createEntry(values, patientId || "")
      setPatient((prev) =>
        prev
          ? {
            ...prev,
            entries: [...prev.entries, newEntry],
          }
          : prev
      );
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchPatient = async () => {
      const patientData = await patientService.getById(patientId || "")
      if (patientData) setPatient(patientData)
      else setPatient(null)
    }

    fetchPatient()
  }, [patientId]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const allDiagnoses = await diagnosisService.getAll()
      setDiagnoses(allDiagnoses)
    }
    fetchDiagnoses()
  }, [])

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
            <EntriesList entries={patient.entries} diagnoses={diagnoses}/>
            <AddEntryModal
              modalOpen={modalOpen}
              onClose={closeModal}
              onSubmit={createEntry}
              diagnoses={diagnoses}
            />
            <Button
              variant="contained"
              onClick={() => openModal()}
              sx={{ mt: 3}}
            >
              Add New Entry
            </Button>
          </Box>)
        : <Typography>No patient found!</Typography>
      }
    </Box>
  )
}

export default PatientPage
import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients';
import { Entry, NewEntry, NewPatient, NonSensitivePatient, Patient } from "../types"

const patients: Patient[] = patientData

const getAllWithoutSsn = (): NonSensitivePatient[] =>
  patients.map(({ ssn, entries, ...rest }) => rest);

const getById = (patientId: string): Patient | undefined =>
  patients.find(patient => patient.id === patientId)

const create = (patient: NewPatient)=> {
  const newPatient = {
    id: uuidv4(),
    entries: [],
    ...patient
  }
  patients.push(newPatient)
  return newPatient
}

const createEntry = (entry: NewEntry, patientId: string): Entry | undefined => {
  const newEntry = {
    id: uuidv4(),
    ...entry
  }
  const patient = patients.find(patient => patient.id === patientId)
  if (!patient) return undefined
  patient.entries.push(newEntry)

  return newEntry
}


export default {
  getAllWithoutSsn,
  getById,
  create,
  createEntry
};
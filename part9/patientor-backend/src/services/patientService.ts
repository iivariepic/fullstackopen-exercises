import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients';
import { Patient } from "../types"

const patients: Patient[] = patientData as Patient[]

const getAllWithoutSsn = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ ssn, ...rest }) => rest);
};

const create = (patient: Omit<Patient, 'id'>)=> {
  const newPatient = {
    id: uuidv4(),
    ...patient
  }
  patients.push(newPatient)
  return newPatient
}

export default {
  getAllWithoutSsn,
  create
};
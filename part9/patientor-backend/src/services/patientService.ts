import patientData from '../../data/patients';
import { Patient } from "../types"

const getAllWithoutSsn = (): Omit<Patient, 'ssn'>[] => {
  return patientData.map(({ ssn, ...rest }) => rest);
};

export default {
  getAllWithoutSsn
};
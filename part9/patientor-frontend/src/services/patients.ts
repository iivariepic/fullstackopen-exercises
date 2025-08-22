import axios from "axios";
import { EntryFormValues, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (patientId: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${patientId}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (object: EntryFormValues, patientId: string) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object
  );

  return data;
};

export default {
  getAll,
  getById,
  create,
  createEntry
};


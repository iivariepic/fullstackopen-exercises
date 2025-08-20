import { Gender, NewPatient } from "./types"
import { z } from 'zod';

export const validateNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object)
}

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  occupation: z.string(),
  gender: z.enum(Gender)
})
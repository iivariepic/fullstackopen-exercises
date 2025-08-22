import { Gender, NewEntry, NewPatient } from "./types"
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

export const validateNewEntry = (object: unknown): NewEntry => {
  return NewEntrySchema.parse(object)
}

export const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCode: z.string().optional()
})

export const NewOccupationalEntrySchema = z.object({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date(),
  })
})

export const NewHealthCheckEntrySchema = z.object({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.int().max(3).min(0)
})

export const NewHospitalEntrySchema = z.object({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string()
  })
})

export const NewEntrySchema = z.discriminatedUnion("type", [
  BaseEntrySchema.extend(NewOccupationalEntrySchema.shape),
  BaseEntrySchema.extend(NewHealthCheckEntrySchema.shape),
  BaseEntrySchema.extend(NewHospitalEntrySchema.shape),
])
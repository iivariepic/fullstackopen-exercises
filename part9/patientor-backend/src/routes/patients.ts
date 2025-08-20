import express from 'express';
import patientService from '../services/patientService'
import { Patient } from "../types"

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAllWithoutSsn())
});

router.post('/', (req, res) => {
  const patient: Omit<Patient, 'id'> = req.body
  const addedPatient = patientService.create(patient)
  res.json(addedPatient)
});

export default router;
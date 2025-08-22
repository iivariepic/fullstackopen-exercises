import express from 'express';
import patientService from '../services/patientService'
import { validateNewPatient } from "../utils"
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAllWithoutSsn())
});

router.get('/:patientId', (req, res) => {
  const { patientId } = req.params
  const patient = patientService.getById(patientId)
  if (!patient) {
    return res.status(404).send({ error: 'Patient not found' })
  }
  return res.json(patient)
});

router.post('/', (req, res) => {
  try {
    const patient = validateNewPatient(req.body)
    const addedPatient = patientService.create(patient)
    res.json(addedPatient)
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;